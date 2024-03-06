import { AppStore, createStore } from '../../_redux_/createStore.ts'
import { createBlockSession } from './create-block-session.usecase.ts'
import { expect } from 'vitest'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { BlockSession } from '../block.session.ts'
import {
  selectAllBlockSessionIds,
  selectBlockSessionById,
} from '../block-session.slice.ts'

export function createBlockSessionFixture() {
  const store: AppStore = createStore({
    blockSessionRepository: new FakeDataBlockSessionRepository(),
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
