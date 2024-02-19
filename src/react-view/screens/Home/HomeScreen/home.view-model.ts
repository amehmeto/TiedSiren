import { RootState } from '../../../../core/createStore.ts'
import { blockSessionAdapter } from '../../../../core/block-session/block.session.ts'
import { formatDistance } from 'date-fns'

export const selectHomeViewModel = (
  rootState: RootState,
  getNow: () => string,
) => {
  const blockSessions = blockSessionAdapter
    .getSelectors()
    .selectAll(rootState.blockSession)

  if (!blockSessions.length)
    return {
      type: 'NO_BLOCK_SESSIONS',
      sessionBoardTitle: 'No active sessions',
      message:
        "Starting a session allows you to quickly focus on a task at hand and do what's important to you.",
      blockSessions: null,
    }

  const viewBlockSessions = blockSessions.map((viewBlockSession) => {
    const nowDate = new Date(getNow()).getTime()
    const endDate = new Date(viewBlockSession.end).getTime()

    const formattedDate = formatDistance(endDate, nowDate, {
      addSuffix: true,
    })

    return {
      id: viewBlockSession.id,
      name: viewBlockSession.name,
      minutesLeft: 'Ends ' + formattedDate,
      blocklists: viewBlockSession.blocklists.length,
      devices: viewBlockSession.devices.length,
    }
  })

  return {
    type: 'ONE_OR_MORE_BLOCK_SESSIONS',
    sessionBoardTitle: 'Active sessions',
    blockSessions: viewBlockSessions,
  }
}
