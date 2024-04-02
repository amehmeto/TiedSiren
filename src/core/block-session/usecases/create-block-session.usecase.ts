import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { BlockSession } from '../block.session.ts'

export const createBlockSession = createAppAsyncThunk(
  'blockSession/createBlockSession',
  async (payload: BlockSession, { extra: { blockSessionRepository } }) => {
    return blockSessionRepository.create(payload)
  },
)
