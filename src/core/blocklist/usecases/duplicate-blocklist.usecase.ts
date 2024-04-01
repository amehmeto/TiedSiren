import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'

export const duplicateBlocklist = createAppAsyncThunk(
  'blocklist/duplicateBlocklist',
  async (
    payload: { id: string; name: string },
    { extra: { blocklistRepository } },
  ) => {
    const blocklistToBeCopied = await blocklistRepository.findById(payload.id)
    const { id, ...blocklistToBeCopiedWithoutId } = blocklistToBeCopied
    return blocklistRepository.createBlocklist({
      ...blocklistToBeCopiedWithoutId,
      name: payload.name,
    })
  },
)
