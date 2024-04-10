import { createSlice } from '@reduxjs/toolkit'
import { createBlockSession } from './usecases/create-block-session.usecase.ts'
import { blockSessionAdapter } from './block.session.ts'
import { duplicateBlockSession } from './usecases/duplicate-block-session.usecase.ts'
import { renameBlockSession } from './usecases/rename-block-session.usecase.ts'
import { deleteBlockSession } from './usecases/delete-block-session.usecase.ts'
import { updateBlockSession } from './usecases/update-block-session.usecase.ts'

export const blockSessionSlice = createSlice({
  name: 'blockSession',
  initialState: blockSessionAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createBlockSession.fulfilled, (state, action) => {
        blockSessionAdapter.addOne(state, action.payload)
      })
      .addCase(duplicateBlockSession.fulfilled, (state, action) => {
        blockSessionAdapter.addOne(state, action.payload)
      })
      .addCase(renameBlockSession.fulfilled, (state, action) => {
        blockSessionAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        })
      })
      .addCase(deleteBlockSession.fulfilled, (state, action) => {
        blockSessionAdapter.removeOne(state, action.payload)
      })
      .addCase(updateBlockSession.fulfilled, (state, action) => {
        blockSessionAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        })
      })
  },
})
