import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { BlockSessionRepository } from './block-session/ports/block-session.repository.ts'
import { rootReducer } from './rootReducer.ts'

export type Dependencies = {
  blockSessionRepository: BlockSessionRepository
}

export const createStore = (dependencies: Dependencies) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: dependencies,
        },
      }),
  })

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<RootState, Dependencies, AnyAction>
