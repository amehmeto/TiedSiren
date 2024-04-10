import { BlockSession } from '../block.session.ts'
import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const updateBlockSession = createAppAsyncThunk(
  'blockSession/updateBlockSession',
  async (
    payload: Partial<BlockSession> & Required<Pick<BlockSession, 'id'>>,
    { extra: { blockSessionRepository } },
  ) => {
    await blockSessionRepository.update(payload)
    return payload
  },
)
