import { combineReducers } from '@reduxjs/toolkit'
import { blockSessionSlice } from '../block-session/block-session.slice.ts'
import { blocklistSlice } from '../blocklist/blocklist.slice.ts'
import { sirenSlice } from '../siren/siren.slice.ts'

export const rootReducer = combineReducers({
  blockSession: blockSessionSlice.reducer,
  blocklist: blocklistSlice.reducer,
  siren: sirenSlice.reducer,
})
