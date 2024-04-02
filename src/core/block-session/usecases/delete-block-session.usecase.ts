import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const deleteBlockSession = createAppAsyncThunk(
  'blockSession/deleteBlockSession',
  async (sessionId: string, { extra: { blockSessionRepository } }) => {
    return blockSessionRepository.delete(sessionId)
  },
)
