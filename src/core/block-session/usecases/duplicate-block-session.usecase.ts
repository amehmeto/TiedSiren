import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const duplicateBlockSession = createAppAsyncThunk(
  'blockSession/duplicateBlockSession',
  async (
    payload: { id: string; name: string },
    { extra: { blockSessionRepository } },
  ) => {
    const session = await blockSessionRepository.findById(payload.id)
    const { id, ...sessionWithoutId } = session
    return blockSessionRepository.create({
      ...sessionWithoutId,
      name: payload.name,
    })
  },
)
