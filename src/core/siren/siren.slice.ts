import { createSlice } from '@reduxjs/toolkit'
import { fetchAvailableSirens } from './usecases/fetch-available-sirens.usecase.ts'
import { Sirens } from './sirens.ts'

export const sirenSlice = createSlice({
  name: 'siren',
  initialState: {
    availableSirens: {
      android: [],
      windows: [],
      macos: [],
      ios: [],
      linux: [],
      websites: [],
      keywords: [],
    } as Sirens,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAvailableSirens.fulfilled, (state, action) => {
      state.availableSirens = action.payload
    })
  },
})
