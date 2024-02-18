import { createSlice } from '@reduxjs/toolkit'
import { createBlockSession } from './usecases/create-block-session.usecase.ts'
import { BlockSession } from './block.session.ts'

type BlockSessionState = {
  blockSessions: BlockSession[]
}
export const blockSessionSlice = createSlice({
  name: 'blockSession',
  initialState: { blockSessions: [] } as BlockSessionState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createBlockSession.fulfilled, (state, action) => {
      console.log(action.payload)
      state.blockSessions.push(action.payload)
    })
  },
})
