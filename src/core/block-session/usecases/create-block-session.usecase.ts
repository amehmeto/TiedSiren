import { createAppAsyncThunk } from '../../create-app-thunk.ts'
import { BlockSession } from '../block.session.ts'

export const createBlockSession = createAppAsyncThunk(
  'blockSession/createBlockSession',
  async (payload: BlockSession, { extra: { blockSessionRepository } }) => {
    return blockSessionRepository.createSession(payload)
  },
)