import { RootState } from '../../../../core/_redux_/createStore.ts'
import {
  BlockSession,
  blockSessionAdapter,
} from '../../../../core/block-session/block.session.ts'
import { formatDistance, isAfter, isBefore } from 'date-fns'
import { createSelector } from '@reduxjs/toolkit'
import {
  Greetings,
  HomeViewModel,
  HomeViewModelType,
} from './home-view-model.types.ts'

function greetUser(now: string) {
  const hour = new Date(now).getUTCHours()

  if (hour >= 6 && hour < 12) return Greetings.GoodMorning
  if (hour >= 12 && hour < 18) return Greetings.GoodAfternoon
  if (hour >= 18 && hour < 22) return Greetings.GoodEvening
  return Greetings.GoodNight
}

function generateTimeline(now: Date, start: Date, end: Date) {
  return isAfter(now, start)
    ? 'Ends ' +
        formatDistance(end, now, {
          addSuffix: true,
        })
    : 'Starts at ' +
        start.getUTCHours().toString().padStart(2, '0') +
        ':' +
        start.getUTCMinutes().toString().padStart(2, '0')
}

function recoverIsoDate(now: Date, time: string) {
  const [todayDate] = now.toISOString().split('T')
  return `${todayDate}T${time}.000Z`
}

function formatToViewModel(
  blockSessions: BlockSession[],
  getNow: () => string,
) {
  return blockSessions.map((session) => {
    const now = new Date(getNow())
    const start = new Date(recoverIsoDate(now, session.start))
    const end = new Date(recoverIsoDate(now, session.end))

    const timeline = generateTimeline(now, start, end)

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
    (_state: RootState, getNow: () => string) => getNow,
  ],
  (blockSession, getNow): HomeViewModelType => {
    const blockSessions = blockSessionAdapter
      .getSelectors()
      .selectAll(blockSession)

    const greetings = greetUser(getNow())

    const NO_ACTIVE_SESSION = {
      title: 'NO ACTIVE SESSIONS' as const,
      message:
        "Starting a session allows you to quickly focus on a task at hand and do what's important to you." as const,
    }

    const NO_SCHEDULED_SESSION = {
      title: 'NO SCHEDULED SESSIONS' as const,
      message:
        "Starting a session allows you to quickly focus on a task at hand and do what's important to you." as const,
    }

    if (!blockSessions.length)
      return {
        type: HomeViewModel.WithoutActiveNorScheduledSessions,
        greetings,
        activeSessions: NO_ACTIVE_SESSION,
        scheduledSessions: NO_SCHEDULED_SESSION,
      }

    const activeSessions = blockSessions.filter((session) => {
      const now = new Date(getNow())
      const start = new Date(recoverIsoDate(now, session.start))
      return isAfter(now, start)
    })
    const formattedActiveSessions = formatToViewModel(activeSessions, getNow)

    const scheduledSessions = blockSessions.filter((session) => {
      const now = new Date(getNow())
      const start = new Date(recoverIsoDate(now, session.start))
      return isBefore(now, start)
    })
    const formattedScheduledSessions = formatToViewModel(
      scheduledSessions,
      getNow,
    )

    if (!activeSessions.length)
      return {
        type: HomeViewModel.WithoutActiveWithScheduledSessions,
        greetings,
        activeSessions: NO_ACTIVE_SESSION,
        scheduledSessions: {
          title: 'SCHEDULED SESSIONS',
          blockSessions: formattedScheduledSessions,
        },
      }

    return {
      type: HomeViewModel.WithActiveWithoutScheduledSessions,
      greetings,
      activeSessions: {
        title: 'ACTIVE SESSIONS',
        blockSessions: formattedActiveSessions,
      },
      scheduledSessions: NO_SCHEDULED_SESSION,
    }
  },
)
