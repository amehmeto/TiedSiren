import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const renameBlockSession = createAppAsyncThunk(
  'blockSession/renameBlockSession',
  async (
    payload: { id: string; name: string },
    { extra: { blockSessionRepository } },
  ) => {
    const session = await blockSessionRepository.findById(payload.id)
    session.name = payload.name
    return blockSessionRepository.update(session)
  },
)
