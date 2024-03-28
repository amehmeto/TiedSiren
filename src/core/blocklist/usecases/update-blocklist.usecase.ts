import { createAppAsyncThunk } from '../../_redux_/create-app-thunk.ts'
import { Blocklist } from '../blocklist.ts'

export const updateBlocklist = createAppAsyncThunk(
  'blocklist/updateBlocklist',
  async (
    payload: Partial<Blocklist> & Required<Pick<Blocklist, 'id'>>,
    { extra: { blocklistRepository } },
  ) => {
    await blocklistRepository.updateBlocklist(payload)
    return payload
  },
)
