import { RootState } from '../../_redux_/createStore.ts'
import { blocklistAdapter } from '../blocklist.ts'

export const selectBlocklistById = (blocklistId: string, state: RootState) =>
  blocklistAdapter.getSelectors().selectById(state.blocklist, blocklistId)
