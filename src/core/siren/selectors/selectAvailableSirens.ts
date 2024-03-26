import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../_redux_/createStore.ts'

export const selectAvailableSirens = createSelector(
  [(state: RootState) => state.siren],
  (sirens) => sirens.availableSirens,
)
