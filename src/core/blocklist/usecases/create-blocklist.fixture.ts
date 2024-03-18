import { Blocklist } from '../blocklist.ts'
import { expect } from 'vitest'
import { AppStore, createStore } from '../../_redux_/createStore.ts'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { FakeDataBlocklistRepository } from '../../../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { selectBlocklistById } from '../blocklist.slice.ts'
import { createBlocklist } from './create-blocklist.usecase.ts'

export function createBlocklistFixture() {
  const store: AppStore = createStore({
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
