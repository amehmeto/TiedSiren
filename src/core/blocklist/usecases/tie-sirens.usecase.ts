import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { selectActiveSessions } from '../../block-session/selectors/selectActiveSessions.ts'
import { BlockSession } from '../../block-session/block.session.ts'
import { Sirens } from '../blocklist.ts'

export const tieSirens = createAppAsyncThunk(
  'blocklist/tieSirens ',
  async (_, { extra: { sirenTier, dateProvider }, getState }) => {
    const activeBlockSessions: BlockSession[] = selectActiveSessions(
      dateProvider.getNow(),
      getState().blockSession,
    )

    const sirens: Sirens = activeBlockSessions.reduce(
      (acc: Sirens, blockSession) => {
        blockSession.blocklists.forEach((blocklist) => {
          const sirens = blocklist.sirens
          acc.android = [...acc.android, ...sirens.android]
          acc.windows = [...acc.windows, ...sirens.windows]
          acc.macos = [...acc.macos, ...sirens.macos]
          acc.ios = [...acc.ios, ...sirens.ios]
          acc.linux = [...acc.linux, ...sirens.linux]
          acc.websites = [...acc.websites, ...sirens.websites]
          acc.keywords = [...acc.keywords, ...sirens.keywords]
        })
        return acc
      },
      {
        android: [],
        windows: [],
        macos: [],
        ios: [],
        linux: [],
        websites: [],
        keywords: [],
      },
    )
    await sirenTier.tie(sirens)
  },
)
