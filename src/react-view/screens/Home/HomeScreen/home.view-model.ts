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
import { DateProvider } from '../../../../infra/date-provider/port.date-provider.ts'

function greetUser(now: Date) {
  const hour = now.getHours()

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
        start.getHours().toString().padStart(2, '0') +
        ':' +
        start.getMinutes().toString().padStart(2, '0')
}

function recoverDate(now: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number)

  const todayWithNewTime = new Date(now.getTime())
  todayWithNewTime.setHours(hours)
  todayWithNewTime.setMinutes(minutes)

  return todayWithNewTime
}

function formatToViewModel(blockSessions: BlockSession[], now: Date) {
  return blockSessions.map((session) => {
    const start = recoverDate(now, session.start)
    const end = recoverDate(now, session.end)

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

function isActive(now: Date, start: Date, end: Date) {
  return isAfter(now, start) && isBefore(now, end)
}

export const selectHomeViewModel = createSelector(
  [
    (rootState: RootState) => rootState.blockSession,
    (_state: RootState, dateProvider: DateProvider) => dateProvider,
  ],
  (blockSession, dateProvider): HomeViewModelType => {
    const blockSessions = blockSessionAdapter
      .getSelectors()
      .selectAll(blockSession)

    const greetings = greetUser(dateProvider.getNow())

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
      const now = dateProvider.getNow()
      const start = recoverDate(now, session.start)
      const end = recoverDate(now, session.end)
      return isActive(now, start, end)
    })
    const formattedActiveSessions = formatToViewModel(
      activeSessions,
      dateProvider.getNow(),
    )

    const scheduledSessions = blockSessions.filter((session) => {
      const now = dateProvider.getNow()
      const start = recoverDate(now, session.start)
      const end = recoverDate(now, session.end)
      return !isActive(now, start, end)
    })
    const formattedScheduledSessions = formatToViewModel(
      scheduledSessions,
      dateProvider.getNow(),
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
