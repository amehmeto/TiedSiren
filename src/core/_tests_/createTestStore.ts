import { createStore, Dependencies } from '../_redux_/createStore.ts'
import { FakeDataBlockSessionRepository } from '../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { rootReducer } from '../_redux_/rootReducer.ts'
import { FakeDataBlocklistRepository } from '../../infra/blocklist-repository/fake-data.blocklist.repository.ts'

export const createTestStore = (
  {
    blockSessionRepository = new FakeDataBlockSessionRepository(),
    blocklistRepository = new FakeDataBlocklistRepository(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  createStore(
    {
      blockSessionRepository,
      blocklistRepository,
    },
    preloadedState,
  )
