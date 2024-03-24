import { createStore, Dependencies } from '../_redux_/createStore.ts'
import { FakeDataBlockSessionRepository } from '../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { rootReducer } from '../_redux_/rootReducer.ts'
import { FakeDataBlocklistRepository } from '../../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { InMemorySirenTier } from '../../infra/siren-binder/in-memory-siren.tier.ts'
import { StubDateProvider } from '../../infra/date-provider/stub.date-provider.ts'

export const createTestStore = (
  {
    blockSessionRepository = new FakeDataBlockSessionRepository(),
    blocklistRepository = new FakeDataBlocklistRepository(),
    sirenTier = new InMemorySirenTier(),
    dateProvider = new StubDateProvider(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  createStore(
    {
      blockSessionRepository,
      blocklistRepository,
      sirenTier,
      dateProvider,
    },
    preloadedState,
  )
