import { blocklistAdapter } from '../blocklist.ts'
import { RootState } from '../../_redux_/createStore.ts'
import { createSelector } from '@reduxjs/toolkit'

export const selectAllBlocklists = createSelector(
  [(state: RootState) => state.blocklist],
  (blocklists) => blocklistAdapter.getSelectors().selectAll(blocklists),
)
