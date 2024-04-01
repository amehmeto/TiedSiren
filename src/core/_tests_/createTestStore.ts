import { createStore } from '../_redux_/createStore.ts'
import { FakeDataBlockSessionRepository } from '../../infra/block-session-repository/fake-data.block-session.repository.ts'
import { rootReducer } from '../_redux_/rootReducer.ts'
import { FakeDataBlocklistRepository } from '../../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { InMemorySirenTier } from '../../infra/siren-binder/in-memory-siren.tier.ts'
import { StubDateProvider } from '../../infra/date-provider/stub.date-provider.ts'
import { Dependencies } from '../_redux_/dependencies.ts'
import { FakeDataInstalledAppsRepository } from '../../infra/installed-apps-repository/fake-data.installed-apps.repository.ts'
import { FakeDataSirensRepository } from '../../infra/sirens-repository/fake-data.sirens-repository.ts'

export const createTestStore = (
  {
    blockSessionRepository = new FakeDataBlockSessionRepository(),
    blocklistRepository = new FakeDataBlocklistRepository(),
    sirenTier = new InMemorySirenTier(),
    dateProvider = new StubDateProvider(),
    installedAppRepository = new FakeDataInstalledAppsRepository(),
    sirensRepository = new FakeDataSirensRepository(),
  }: Partial<Dependencies> = {},
  preloadedState?: Partial<ReturnType<typeof rootReducer>>,
) =>
  createStore(
    {
      blockSessionRepository,
      blocklistRepository,
      sirenTier,
      dateProvider,
      installedAppRepository,
      sirensRepository,
    },
    preloadedState,
  )
