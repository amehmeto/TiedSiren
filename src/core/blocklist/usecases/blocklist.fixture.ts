import { Blocklist } from '../blocklist.ts'
import { expect } from 'vitest'
import { AppStore } from '../../_redux_/createStore.ts'
import { createBlocklist } from './create-blocklist.usecase.ts'
import { selectBlocklistById } from '../selectors/selectBlocklistById.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { updateBlocklist } from './update-blocklist.usecase.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'
import { FakeDataBlocklistRepository } from '../../../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { renameBlocklist } from './rename-blocklist.usecase.ts'

export function blocklistFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  let store: AppStore
  const blocklistRepository = new FakeDataBlocklistRepository()

  return {
    given: {
      existingBlocklist: (blocklist: Blocklist) => {
        blocklistRepository.blocklists.set(blocklist.id, blocklist)
        testStateBuilderProvider.setState((builder) =>
          builder.withBlocklists([blocklist]),
        )
      },
    },
    when: {
      updatingBlocklist: async (
        payload: Partial<Blocklist> & Required<Pick<Blocklist, 'id'>>,
      ) => {
        store = createTestStore(
          {
            blocklistRepository,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(updateBlocklist(payload))
      },
      creatingBlocklist: async (payload: Blocklist) => {
        store = createTestStore()
        await store.dispatch(createBlocklist(payload))
      },
      renamingBlocklist: async (renameBlocklistPayload: {
        name: string
        id: string
      }) => {
        store = createTestStore(
          {
            blocklistRepository,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(renameBlocklist(renameBlocklistPayload))
      },
    },
    then: {
      blocklistShouldBeStoredAs: (expectedBlocklist: Blocklist) => {
        const retrievedBlocklist = selectBlocklistById(
          expectedBlocklist.id,
          store.getState(),
        )
        expect(retrievedBlocklist).toStrictEqual(expectedBlocklist)
      },
      blocklistShouldBeSavedInRepositoryAs(expectedBlocklist: Blocklist) {
        const retrievedBlocklist = blocklistRepository.blocklists.get(
          expectedBlocklist.id,
        )
        expect(retrievedBlocklist).toStrictEqual(expectedBlocklist)
      },
    },
  }
}
