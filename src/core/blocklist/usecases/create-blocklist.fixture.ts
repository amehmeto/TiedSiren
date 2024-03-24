import { Blocklist } from '../blocklist.ts'
import { expect } from 'vitest'
import { AppStore } from '../../_redux_/createStore.ts'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { FakeDataBlocklistRepository } from '../../../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { createBlocklist } from './create-blocklist.usecase.ts'
import { selectBlocklistById } from '../selectors/selectBlocklistById.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'

export function createBlocklistFixture() {
  const store: AppStore = createTestStore({
    blockSessionRepository: new FakeDataBlockSessionRepository(),
    blocklistRepository: new FakeDataBlocklistRepository(),
  })

  return {
    when: {
      creatingBlocklist: async (payload: Blocklist) => {
        await store.dispatch(createBlocklist(payload))
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
    },
  }
}
