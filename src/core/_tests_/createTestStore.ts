import { createStore, Dependencies } from '../_redux_/createStore.ts'
import { FakeDataBlockSessionRepository } from '../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { rootReducer } from '../_redux_/rootReducer.ts'

export const createTestStore = (
  {
    blockSessionRepository = new FakeDataBlockSessionRepository(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  createStore(
    {
      blockSessionRepository,
    },
    preloadedState,
  )
