import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { Blocklist } from '../blocklist.ts'

import { UpdatePayload } from '../../ports/update.payload.ts'

export const updateBlocklist = createAppAsyncThunk(
  'blocklist/updateBlocklist',
  async (
    payload: UpdatePayload<Blocklist>,
    { extra: { blocklistRepository } },
  ) => {
    await blocklistRepository.update(payload)
    return payload
  },
)
