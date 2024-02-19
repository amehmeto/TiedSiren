import { createStore, Dependencies } from './createStore.ts'
import { FakeDataBlockSessionRepository } from '../infra/block-session-repository/fake-data.block-session.repository.ts'
import { rootReducer } from './rootReducer.ts'

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
