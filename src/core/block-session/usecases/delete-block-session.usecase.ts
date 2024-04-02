import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const deleteBlockSession = createAppAsyncThunk(
  'blockSession/deleteBlockSession',
  async (sessionId: string, { extra: { blockSessionRepository } }) => {
    await blockSessionRepository.delete(sessionId)
    return sessionId
  },
)
