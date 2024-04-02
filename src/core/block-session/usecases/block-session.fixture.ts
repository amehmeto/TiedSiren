import { AppStore } from '../../_redux_/createStore.ts'
import { createBlockSession } from './create-block-session.usecase.ts'
import { expect } from 'vitest'
import { BlockSession, blockSessionAdapter } from '../block.session.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'
import { duplicateBlockSession } from './duplicate-block-session.usecase.ts'
import { selectBlockSessionById } from '../selectors/selectBlockSessionById.ts'
import { selectAllBlockSessionIds } from '../selectors/selectAllBlockSessionIds.ts'

export function blockSessionFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  let store: AppStore
  const blockSessionRepository = new FakeDataBlockSessionRepository()

  return {
    given: {
      existingBlockSession(givenBlockSession: BlockSession) {
        blockSessionRepository.entities.set(
          givenBlockSession.id,
          givenBlockSession,
        )
        testStateBuilderProvider.setState((builder) =>
          builder.withBlockSessions([givenBlockSession]),
        )
      },
    },
    when: {
      creatingBlockSession: async (payload: BlockSession) => {
        store = createTestStore()
        await store.dispatch(createBlockSession(payload))
      },
      duplicatingBlockSession: async (toBeDuplicatedPayload: {
        name: string
        id: string
      }) => {
        store = createTestStore(
          {
            blockSessionRepository,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(duplicateBlockSession(toBeDuplicatedPayload))
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
      retrievedBlockSessionsFromStoreShouldBe(
        expectedBlocklists: BlockSession[],
      ) {
        const state = store.getState().blockSession
        const retrievedBlockSessions = blockSessionAdapter
          .getSelectors()
          .selectAll(state)
        expect(retrievedBlockSessions).toStrictEqual(expectedBlocklists)
      },
    },
  }
}
