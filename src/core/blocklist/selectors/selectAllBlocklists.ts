import { blocklistAdapter } from '../blocklist.ts'
import { RootState } from '../../_redux_/createStore.ts'

export const selectAllBlocklists = (state: RootState) =>
  blocklistAdapter.getSelectors().selectAll(state.blocklist)
