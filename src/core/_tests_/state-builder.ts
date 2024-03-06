import {
  BlockSession,
  blockSessionAdapter,
} from '../block-session/block.session.ts'
import { RootState } from '../_redux_/createStore.ts'
import {
  ActionCreatorWithPayload,
  createAction,
  createReducer,
} from '@reduxjs/toolkit'
import { rootReducer } from '../_redux_/rootReducer.ts'

const initialState = rootReducer(undefined, { type: 'unknown' })

const withBlockSessions = createAction<BlockSession[]>('withBlockSession')

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(withBlockSessions, (state, action) => {
    blockSessionAdapter.addMany(state.blockSession, action.payload)
  })
})

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) =>
      stateBuilder(reducer(baseState, actionCreator(payload)))

  return {
    withBlockSessions: reduce(withBlockSessions),
    build(): RootState {
      return baseState
    },
  }
}
