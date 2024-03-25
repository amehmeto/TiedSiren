import { createSlice } from '@reduxjs/toolkit'
import { blocklistAdapter } from './blocklist.ts'
import { createBlocklist } from './usecases/create-blocklist.usecase.ts'
import { tieSirens } from './usecases/tie-sirens.usecase.ts'

export const blocklistSlice = createSlice({
  name: 'blocklist',
  initialState: blocklistAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createBlocklist.fulfilled, (state, action) => {
        blocklistAdapter.addOne(state, action.payload)
      })
      .addCase(tieSirens.fulfilled, () => {
        console.log('sirens tied!')
      })
  },
})
