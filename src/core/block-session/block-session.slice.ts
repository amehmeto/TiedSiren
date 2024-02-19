import { createSlice } from '@reduxjs/toolkit'
import { createBlockSession } from './usecases/create-block-session.usecase.ts'
import { blockSessionAdapter } from './block.session.ts'
import { RootState } from '../createStore.ts'

export const blockSessionSlice = createSlice({
  name: 'blockSession',
  initialState: blockSessionAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createBlockSession.fulfilled, (state, action) => {
      blockSessionAdapter.addOne(state, action.payload)
    })
  },
})

export const selectBlockSessionById = (sessionId: string, state: RootState) =>
  blockSessionAdapter.getSelectors().selectById(state.blockSession, sessionId)

export const selectAllBlockSessionIds = (state: RootState) =>
  blockSessionAdapter.getSelectors().selectIds(state.blockSession)
