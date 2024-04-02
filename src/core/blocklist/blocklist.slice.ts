import { createSlice } from '@reduxjs/toolkit'
import { blocklistAdapter } from './blocklist.ts'
import { createBlocklist } from './usecases/create-blocklist.usecase.ts'
import { updateBlocklist } from './usecases/update-blocklist.usecase.ts'
import { renameBlocklist } from './usecases/rename-blocklist.usecase.ts'
import { duplicateBlocklist } from './usecases/duplicate-blocklist.usecase.ts'
import { deleteBlocklist } from './usecases/delete-blocklist.usecase.ts'

export const blocklistSlice = createSlice({
  name: 'blocklist',
  initialState: blocklistAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createBlocklist.fulfilled, (state, action) => {
        blocklistAdapter.addOne(state, action.payload)
      })
      .addCase(updateBlocklist.fulfilled, (state, action) => {
        blocklistAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        })
      })
      .addCase(renameBlocklist.fulfilled, (state, action) => {
        blocklistAdapter.updateOne(state, {
          id: action.payload.id,
          changes: { name: action.payload.name },
        })
      })
      .addCase(duplicateBlocklist.fulfilled, (state, action) => {
        blocklistAdapter.addOne(state, action.payload)
      })
      .addCase(deleteBlocklist.fulfilled, (state, action) => {
        blocklistAdapter.removeOne(state, action.payload)
      })
  },
})
