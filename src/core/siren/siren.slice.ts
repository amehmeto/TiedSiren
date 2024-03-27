import { createSlice } from '@reduxjs/toolkit'
import { fetchAvailableSirens } from './usecases/fetch-available-sirens.usecase.ts'
import { Sirens } from './sirens.ts'
import { addKeywordToSirens } from './usecases/add-keyword-to-sirens.usecase.ts'
import { addWebsiteToSirens } from './usecases/add-website-to-sirens.usecase.ts'

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
    builder
      .addCase(fetchAvailableSirens.fulfilled, (state, action) => {
        state.availableSirens = action.payload
      })
      .addCase(addKeywordToSirens.fulfilled, (state, action) => {
        state.availableSirens.keywords.push(action.payload)
      })
      .addCase(addWebsiteToSirens.fulfilled, (state, action) => {
        state.availableSirens.websites.push(action.payload)
      })
  },
})
