import { AppStore, createStore } from '../../createStore.ts'
import { createBlockSession } from './create-block-session.usecase.ts'
import { expect } from 'vitest'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { BlockSession } from '../block.session.ts'

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
      blockSessionsShouldBe: (expectedBlockSessions: BlockSession[]) => {
        const retrievedBlockSessions =
          store.getState().blockSession.blockSessions
        expect(retrievedBlockSessions).toStrictEqual(expectedBlockSessions)
      },
    },
  }
}
