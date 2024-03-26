import { AppStore } from '../../_redux_/createStore.ts'
import { createBlockSession } from './create-block-session.usecase.ts'
import { expect } from 'vitest'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { BlockSession } from '../block.session.ts'
import {
  selectAllBlockSessionIds,
  selectBlockSessionById,
} from '../block-session.slice.ts'
import { FakeDataBlocklistRepository } from '../../../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { InMemorySirenTier } from '../../../infra/siren-binder/in-memory-siren.tier.ts'
import { RealDateProvider } from '../../../infra/date-provider/real.date-provider.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'

export function createBlockSessionFixture() {
  const store: AppStore = createTestStore({
    blockSessionRepository: new FakeDataBlockSessionRepository(),
    blocklistRepository: new FakeDataBlocklistRepository(),
    sirenTier: new InMemorySirenTier(),
    dateProvider: new RealDateProvider(),
  })

  return {
    when: {
      creatingBlockSession: async (payload: BlockSession) => {
        await store.dispatch(createBlockSession(payload))
      },
    },
    then: {
      blockSessionsShouldBeStoredAs: (expectedBlockSession: BlockSession) => {
        const retrievedBlockSessions = selectBlockSessionById(
          expectedBlockSession.id,
          store.getState(),
        )
        expect(retrievedBlockSessions).toStrictEqual(expectedBlockSession)

        const blockSessionIds = selectAllBlockSessionIds(store.getState())
        expect(blockSessionIds).toContain(expectedBlockSession.id)
      },
    },
  }
}
