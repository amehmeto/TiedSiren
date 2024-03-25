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
import { Blocklist, blocklistAdapter } from '../blocklist/blocklist.ts'

const initialState = rootReducer(undefined, { type: 'unknown' })

const withBlockSessions = createAction<BlockSession[]>('withBlockSession')
const withBlocklists = createAction<Blocklist[]>('withBlocklists')

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(withBlockSessions, (state, action) => {
      blockSessionAdapter.addMany(state.blockSession, action.payload)
    })
    .addCase(withBlocklists, (state, action) => {
      blocklistAdapter.addMany(state.blocklist, action.payload)
    })
})

export const stateBuilder = (baseState = initialState) => {
  const reduce =
    <P>(actionCreator: ActionCreatorWithPayload<P>) =>
    (payload: P) =>
      stateBuilder(reducer(baseState, actionCreator(payload)))

  return {
    build(): RootState {
      return baseState
    },
    withBlockSessions: reduce(withBlockSessions),
    withBlocklists: reduce(withBlocklists),
  }
}

export const stateBuilderProvider = () => {
  let builder = stateBuilder()

  return {
    getState() {
      return builder.build()
    },
    setState(updateFn: (_builder: StateBuilder) => StateBuilder) {
      builder = updateFn(builder)
    },
  }
}

export type StateBuilder = ReturnType<typeof stateBuilder>
export type StateBuilderProvider = ReturnType<typeof stateBuilderProvider>
