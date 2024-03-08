import { RootState } from '../../../../core/_redux_/createStore.ts'
import { blockSessionAdapter } from '../../../../core/block-session/block.session.ts'
import { formatDistance } from 'date-fns'
import { createSelector } from '@reduxjs/toolkit'

type ViewModelBlockSession = {
  id: string
  name: string
  minutesLeft: string
  blocklists: number
  devices: number
}

export enum HomeViewModelType {
  WithoutActiveNorScheduledSessions = 'WITHOUT_ACTIVE_NOR_SCHEDULED_SESSIONS',
  WithActiveWithoutScheduledSessions = 'WITH_ACTIVE_WITHOUT_SCHEDULED_SESSIONS',
  WithoutActiveWithScheduledSessions = 'WITHOUT_ACTIVE_WITH_SCHEDULED_SESSIONS',
  WithActiveAndScheduledSessions = 'WITH_ACTIVE_AND_SCHEDULED_SESSIONS',
}

export enum Greetings {
  GoodMorning = 'Good Morning',
  GoodAfternoon = 'Good Afternoon',
  GoodEvening = 'Good Evening',
  GoodNight = 'Good Night',
}

export type WithoutActiveNorScheduledSessionsViewModel = {
  type: HomeViewModelType.WithoutActiveNorScheduledSessions
  greetings: Greetings
  activeSessions: {
    title: 'NO ACTIVE SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
  scheduledSessions: {
    title: 'NO SCHEDULED SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
}

export type WithActiveWithoutScheduledSessionsModel = {
  type: HomeViewModelType.WithActiveWithoutScheduledSessions
  greetings: Greetings
  activeSessions: {
    title: 'ACTIVE SESSIONS'
    blockSessions: ViewModelBlockSession[]
  }
  scheduledSessions: {
    title: 'NO SCHEDULED SESSIONS'
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
  }
}

function deductTimeLeft(givenEndHour: string, getNow: () => string) {
  const today = new Date(getNow())
  const [todayDate] = today.toISOString().split('T')
  const [endHour] = givenEndHour.split(' ')
  const formattedEndDate = new Date(`${todayDate}T${endHour}.000Z`)

  return formatDistance(formattedEndDate, today, {
    addSuffix: true,
  })
}

function greetUser(now: string) {
  const hour = new Date(now).getUTCHours()

  if (hour >= 6 && hour < 12) return Greetings.GoodMorning
  if (hour >= 12 && hour < 18) return Greetings.GoodAfternoon
  if (hour >= 18 && hour < 22) return Greetings.GoodEvening
  return Greetings.GoodNight
}

export const selectHomeViewModel = createSelector(
  [
    (rootState: RootState) => rootState.blockSession,
    (_state: RootState, getNow: () => string) => getNow,
  ],
  (
    blockSession,
    getNow,
  ):
    | WithoutActiveNorScheduledSessionsViewModel
    | WithActiveWithoutScheduledSessionsModel => {
    const blockSessions = blockSessionAdapter
      .getSelectors()
      .selectAll(blockSession)

    const greetings = greetUser(getNow())

    if (!blockSessions.length)
      return {
        type: HomeViewModelType.WithoutActiveNorScheduledSessions,
        greetings,
        activeSessions: {
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
          title: 'NO ACTIVE SESSIONS',
        },
        scheduledSessions: {
          title: 'NO SCHEDULED SESSIONS',
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
        },
      }

    const viewBlockSessions = blockSessions.map((session) => {
      const formattedDate = deductTimeLeft(session.end, getNow)

      return {
        id: session.id,
        name: session.name,
        minutesLeft: 'Ends ' + formattedDate,
        blocklists: session.blocklists.length,
        devices: session.devices.length,
      }
    })

    return {
      type: HomeViewModelType.WithActiveWithoutScheduledSessions,
      greetings,
      activeSessions: {
        title: 'ACTIVE SESSIONS',
        blockSessions: viewBlockSessions,
      },
      scheduledSessions: {
        title: 'NO SCHEDULED SESSIONS',
        message:
          "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
      },
    }
  },
)
