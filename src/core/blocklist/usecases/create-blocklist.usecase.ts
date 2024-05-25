import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { Blocklist } from '../blocklist.ts'
import { CreatePayload } from '../../ports/create.payload.ts'

export const createBlocklist = createAppAsyncThunk(
  'blocklist/createBlocklist',
  async (
    payload: CreatePayload<Blocklist>,
    { extra: { blocklistRepository } },
  ) => {
    return blocklistRepository.create(payload)
  },
)
