import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, Dependencies, RootState } from './createStore.ts'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  extra: Dependencies
}>()
