import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { selectActiveSessions } from '../../block-session/selectors/selectActiveSessions.ts'
import { BlockSession } from '../../block-session/block.session.ts'
import { Blocklist } from '../blocklist.ts'

export const createAggregatedActiveBlocklist = createAppAsyncThunk(
  'blocklist/createAggregatedActiveBlocklist',
  async (_, { extra: { sirenTier, dateProvider }, getState }) => {
    const activeBlockSessions: BlockSession[] = selectActiveSessions(
      dateProvider.getNow(),
      getState().blockSession,
    )

    const aggregatedActiveList: Blocklist = activeBlockSessions.reduce(
      (acc: Blocklist, blockSession) => {
        blockSession.blocklists.forEach((blocklist) => {
          acc.blocks.apps.android = [
            ...acc.blocks.apps.android,
            ...blocklist.blocks.apps.android,
          ]
          acc.blocks.apps.windows = [
            ...acc.blocks.apps.windows,
            ...(blocklist.blocks.apps.windows || []),
          ]
          acc.blocks.apps.macos = [
            ...acc.blocks.apps.macos,
            ...(blocklist.blocks.apps.macos || []),
          ]
          acc.blocks.apps.ios = [
            ...acc.blocks.apps.ios,
            ...(blocklist.blocks.apps.ios || []),
          ]
          acc.blocks.apps.linux = [
            ...acc.blocks.apps.linux,
            ...(blocklist.blocks.apps.linux || []),
          ]
          acc.blocks.websites = [
            ...acc.blocks.websites,
            ...blocklist.blocks.websites,
          ]
          acc.blocks.keywords = [
            ...acc.blocks.keywords,
            ...blocklist.blocks.keywords,
          ]
        })
        return acc
      },
      {
        id: 'aggregated',
        name: 'Aggregated Active Blocklist',
        blocks: {
          apps: {
            android: [],
            windows: [],
            macos: [],
            ios: [],
            linux: [],
          },
          websites: [],
          keywords: [],
        },
      },
    )
    await sirenTier.block(aggregatedActiveList)
  },
)
