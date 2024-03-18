import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../_redux_/createStore.ts'
import { blocklistAdapter } from './blocklist.ts'
import { createBlocklist } from './usecases/create-blocklist.usecase.ts'

export const blocklistSlice = createSlice({
  name: 'blocklist',
  initialState: blocklistAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createBlocklist.fulfilled, (state, action) => {
      blocklistAdapter.addOne(state, action.payload)
    })
  },
})

export const selectBlocklistById = (blocklistId: string, state: RootState) =>
  blocklistAdapter.getSelectors().selectById(state.blocklist, blocklistId)
