import { RootState } from '../../../../core/createStore.ts'
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
  NoBlockSessions = 'NO_BLOCK_SESSIONS',
  OneOrMoreBlockSessions = 'ONE_OR_MORE_BLOCK_SESSIONS',
}

type NoBlockSessionsViewModel = {
  type: HomeViewModelType.NoBlockSessions
  activeSessions: {
    message: "Starting a session allows you to quickly focus on a task at hand and do what's important to you."
    title: 'NO ACTIVE SESSIONS'
  }
}

type ActiveBlockSessionsViewModel = {
  type: HomeViewModelType.OneOrMoreBlockSessions
  activeSessions: {
    title: 'ACTIVE SESSIONS'
    blockSessions: ViewModelBlockSession[]
  }
}

export const selectHomeViewModel = createSelector(
  [
    (rootState: RootState) => rootState.blockSession,
    (_state: RootState, getNow: () => string) => getNow,
  ],
  (
    blockSession,
    getNow,
  ): NoBlockSessionsViewModel | ActiveBlockSessionsViewModel => {
    const blockSessions = blockSessionAdapter
      .getSelectors()
      .selectAll(blockSession)

    if (!blockSessions.length)
      return {
        type: HomeViewModelType.NoBlockSessions,
        activeSessions: {
          message:
            "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
          title: 'NO ACTIVE SESSIONS',
        },
      }

    function deductTimeLeft(givenEndHour: string) {
      const today = new Date(getNow())
      const [todayDate] = today.toISOString().split('T')
      const [endHour] = givenEndHour.split(' ')
      const formattedEndDate = new Date(`${todayDate}T${endHour}.000Z`)

      return formatDistance(formattedEndDate, today, {
        addSuffix: true,
      })
    }

    const viewBlockSessions = blockSessions.map((session) => {
      const formattedDate = deductTimeLeft(session.end)

      return {
        id: session.id,
        name: session.name,
        minutesLeft: 'Ends ' + formattedDate,
        blocklists: session.blocklists.length,
        devices: session.devices.length,
      }
    })

    return {
      type: HomeViewModelType.OneOrMoreBlockSessions,
      activeSessions: {
        title: 'ACTIVE SESSIONS',
        blockSessions: viewBlockSessions,
      },
    }
  },
)
