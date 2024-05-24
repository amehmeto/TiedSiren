import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const renameBlocklist = createAppAsyncThunk(
  'blocklist/renameBlocklist',
  async (
    payload: { id: string; name: string },
    { extra: { blocklistRepository } },
  ) => {
    await blocklistRepository.update({
      ...payload,
    })
    return payload
  },
)
