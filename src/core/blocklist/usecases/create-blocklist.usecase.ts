import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { Blocklist } from '../blocklist.ts'

export const createBlocklist = createAppAsyncThunk(
  'blocklist/createBlocklist',
  async (
    payload: Omit<Blocklist, 'id'>,
    { extra: { blocklistRepository } },
  ) => {
    return blocklistRepository.create(payload)
  },
)
