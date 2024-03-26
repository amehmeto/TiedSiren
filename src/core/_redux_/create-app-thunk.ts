import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from './createStore.ts'
import { Dependencies } from './dependencies.ts'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  extra: Dependencies
}>()
