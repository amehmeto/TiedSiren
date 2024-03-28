import { AppStore } from '../../_redux_/createStore.ts'
import { createBlockSession } from './create-block-session.usecase.ts'
import { expect } from 'vitest'
import { BlockSession } from '../block.session.ts'
import {
  selectAllBlockSessionIds,
  selectBlockSessionById,
} from '../block-session.slice.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'

export function blockSessionFixture() {
  const store: AppStore = createTestStore()

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
