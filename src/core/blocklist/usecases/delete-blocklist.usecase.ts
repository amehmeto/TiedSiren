import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const deleteBlocklist = createAppAsyncThunk(
  'blocklist/deleteBlocklist',
  async (blocklistId: string, { extra: { blocklistRepository } }) => {
    await blocklistRepository.deleteBlocklist(blocklistId)
    return blocklistId
  },
)
