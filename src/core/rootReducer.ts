import { combineReducers } from '@reduxjs/toolkit'
import { blockSessionSlice } from './block-session/block-session.slice.ts'

export const rootReducer = combineReducers({
  blockSession: blockSessionSlice.reducer,
})
