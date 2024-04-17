import { RootState } from '../../../../core/_redux_/createStore.ts'
import { BlockSession } from '../../../../core/block-session/block.session.ts'
import { formatDistance } from 'date-fns'
import { createSelector } from '@reduxjs/toolkit'
import {
  Greetings,
  HomeViewModel,
  HomeViewModelType,
  SessionBoardMessage,
  SessionBoardTitle,
} from './home-view-model.types.ts'
import {
  isActive,
  selectActiveSessions,
  selectScheduledSessions,
} from '../../../../core/block-session/selectors/selectActiveSessions.ts'
import { selectAllBlockSessions } from '../../../../core/block-session/selectors/selectAllBlockSessions.ts'
import { DateProvider } from '../../../../infra/date-provider/port.date-provider.ts'

function greetUser(now: Date) {
  const hour = now.getHours()

  if (hour >= 6 && hour < 12) return Greetings.GoodMorning
  if (hour >= 12 && hour < 18) return Greetings.GoodAfternoon
  if (hour >= 18 && hour < 22) return Greetings.GoodEvening
  return Greetings.GoodNight
}

function generateTimeInfo(dateProvider: DateProvider, session: BlockSession) {
  const start = dateProvider.recoverDate(session.startedAt)
  const end = dateProvider.recoverDate(session.endedAt)
  const now = dateProvider.getNow()
  return isActive(dateProvider, session)
    ? 'Ends ' +
        formatDistance(end, now, {
          addSuffix: true,
        })
    : 'Starts at ' +
        start.getUTCHours().toString().padStart(2, '0') +
        ':' +
        start.getUTCMinutes().toString().padStart(2, '0')
}

function formatToViewModel(
  blockSessions: BlockSession[],
  dateProvider: DateProvider,
) {
  return blockSessions.map((session) => {
    const timeline = generateTimeInfo(dateProvider, session)

    return {
      id: session.id,
      name: session.name,
      minutesLeft: timeline,
      blocklists: session.blocklists.length,
      devices: session.devices.length,
    }
  })
}

export const selectHomeViewModel = createSelector(
  [
    (rootState: RootState) => rootState.blockSession,
    (_state: RootState, now: Date, dateProvider: DateProvider) => ({
      now,
      dateProvider,
    }),
  ],
  (blockSession, { now, dateProvider }): HomeViewModelType => {
    const blockSessions = selectAllBlockSessions(blockSession)

    const greetings = greetUser(dateProvider.getNow())

    const NO_ACTIVE_SESSION = {
      title: SessionBoardTitle.NO_ACTIVE_SESSIONS as const,
      message: SessionBoardMessage.NO_ACTIVE_SESSIONS as const,
    }

    const NO_SCHEDULED_SESSION = {
      title: SessionBoardTitle.NO_SCHEDULED_SESSIONS as const,
      message: SessionBoardMessage.NO_SCHEDULED_SESSIONS as const,
    }

    if (!blockSessions.length)
      return {
        type: HomeViewModel.WithoutActiveNorScheduledSessions,
        greetings,
        activeSessions: NO_ACTIVE_SESSION,
        scheduledSessions: NO_SCHEDULED_SESSION,
      }

    const activeSessions = selectActiveSessions(dateProvider, blockSession)
    const formattedActiveSessions = formatToViewModel(
      activeSessions,
      dateProvider,
    )

    const scheduledSessions = selectScheduledSessions(
      dateProvider,
      blockSession,
    )
    const formattedScheduledSessions = formatToViewModel(
      scheduledSessions,
      dateProvider,
    )

    if (!activeSessions.length)
      return {
        type: HomeViewModel.WithoutActiveWithScheduledSessions,
        greetings,
        activeSessions: NO_ACTIVE_SESSION,
        scheduledSessions: {
          title: SessionBoardTitle.SCHEDULED_SESSIONS,
          blockSessions: formattedScheduledSessions,
        },
      }

    if (!scheduledSessions.length)
      return {
        type: HomeViewModel.WithActiveWithoutScheduledSessions,
        greetings,
        activeSessions: {
          title: SessionBoardTitle.ACTIVE_SESSIONS,
          blockSessions: formattedActiveSessions,
        },
        scheduledSessions: NO_SCHEDULED_SESSION,
      }

    return {
      type: HomeViewModel.WithActiveAndScheduledSessions,
      greetings,
      activeSessions: {
        title: SessionBoardTitle.ACTIVE_SESSIONS as const,
        blockSessions: formattedActiveSessions,
      },
      scheduledSessions: {
        title: SessionBoardTitle.SCHEDULED_SESSIONS as const,
        blockSessions: formattedScheduledSessions,
      },
    }
  },
)
