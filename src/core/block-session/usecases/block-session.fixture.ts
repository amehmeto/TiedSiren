import { AppStore } from '../../_redux_/createStore.ts'
import {
  createBlockSession,
  CreateBlockSessionPayload,
} from './create-block-session.usecase.ts'
import { expect } from 'vitest'
import { BlockSession, blockSessionAdapter } from '../block.session.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { FakeDataBlockSessionRepository } from '../../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'
import { duplicateBlockSession } from './duplicate-block-session.usecase.ts'
import { selectBlockSessionById } from '../selectors/selectBlockSessionById.ts'
import { selectAllBlockSessionIds } from '../selectors/selectAllBlockSessionIds.ts'
import { renameBlockSession } from './rename-block-session.usecase.ts'
import { deleteBlockSession } from './delete-block-session.usecase.ts'
import { updateBlockSession } from './update-block-session.usecase.ts'
import { FakeNotificationService } from '../../../infra/notification-service/fake.notification.service.ts'
import { NotificationTrigger } from '../../../infra/notification-service/notification.service.ts'
import { StubDateProvider } from '../../../infra/date-provider/stub.date-provider.ts'

export function blockSessionFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  let store: AppStore
  const blockSessionRepository = new FakeDataBlockSessionRepository()
  const notificationService = new FakeNotificationService()
  const dateProvider = new StubDateProvider()

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
      nowIs(now: { hours: number; minutes: number }) {
        const nowDate = new Date()
        nowDate.setUTCHours(now.hours, now.minutes, 0, 0)
        dateProvider.now = nowDate
      },
    },
    when: {
      creatingBlockSession: async (payload: CreateBlockSessionPayload) => {
        store = createTestStore({
          notificationService,
          dateProvider,
        })
        await store.dispatch(createBlockSession(payload))
      },
      duplicatingBlockSession: async (toBeDuplicatedPayload: {
        name: string
        id: string
      }) => {
        store = createTestStore(
          {
            blockSessionRepository,
            notificationService,
            dateProvider,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(duplicateBlockSession(toBeDuplicatedPayload))
      },
      renamingBlockSession: async (toBeRenamedPayload: {
        name: string
        id: string
      }) => {
        store = createTestStore(
          {
            blockSessionRepository,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(renameBlockSession(toBeRenamedPayload))
      },
      deletingBlockSession: async (blockSessionId: string) => {
        store = createTestStore(
          {
            blockSessionRepository,
            notificationService,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(deleteBlockSession(blockSessionId))
      },
      updatingBlockSession: async (
        updateBlockSessionPayload: Partial<BlockSession> &
          Required<Pick<BlockSession, 'id'>>,
      ) => {
        store = createTestStore(
          {
            blockSessionRepository,
            dateProvider,
            notificationService,
          },
          testStateBuilderProvider.getState(),
        )
        await store.dispatch(updateBlockSession(updateBlockSessionPayload))
      },
    },
    then: {
      blockSessionShouldBeStoredAs: (expectedBlockSession: BlockSession) => {
        const retrievedBlockSessions = selectBlockSessionById(
          expectedBlockSession.id,
          store.getState(),
        )
        expect(retrievedBlockSessions).toStrictEqual(expectedBlockSession)

        const blockSessionIds = selectAllBlockSessionIds(store.getState())
        expect(blockSessionIds).toContain(expectedBlockSession.id)
      },
      blockSessionsFromStoreShouldBe(expectedBlocklists: BlockSession[]) {
        const state = store.getState().blockSession
        const retrievedBlockSessions = blockSessionAdapter
          .getSelectors()
          .selectAll(state)
        expect(retrievedBlockSessions).toStrictEqual(expectedBlocklists)
      },
      blockSessionShouldNotBeInStore(sessionId: string) {
        const retrievedBlockSession = selectBlockSessionById(
          sessionId,
          store.getState(),
        )
        expect(retrievedBlockSession).toBeUndefined()
      },
      notificationsShouldBeScheduled(
        expectedNotification: {
          title: string
          body: string
          trigger: NotificationTrigger
        }[],
      ) {
        expect(notificationService.lastScheduledNotification).toEqual(
          expectedNotification,
        )
      },
      scheduledNotificationsShouldCancelled(expectedNotificationIds: string[]) {
        expect(notificationService.lastCancelledNotificationIds).toEqual(
          expectedNotificationIds,
        )
      },
    },
  }
}
