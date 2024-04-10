import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { DeviceRepository } from '../core/device/ports/device.repository'
import { FakeDataDeviceRepository } from '../infra/device-repository/fake-data.device.repository'
import { RealDateProvider } from '../infra/date-provider/real.date-provider.ts'
import { Dependencies } from '../core/_redux_/dependencies.ts'
import { FakeDataBlockSessionRepository } from '../infra/block-session-repository/fake-data.block-session.repository.ts'
import { FakeDataBlocklistRepository } from '../infra/blocklist-repository/fake-data.blocklist.repository.ts'
import { InMemorySirenTier } from '../infra/siren-binder/in-memory-siren.tier.ts'
import { FakeDataSirensRepository } from '../infra/sirens-repository/fake-data.sirens-repository.ts'

new FakeDataInstalledAppsRepository()
export const deviceRepository: DeviceRepository = new FakeDataDeviceRepository()

export const dependencies: Dependencies = {
  blockSessionRepository: new FakeDataBlockSessionRepository(),
  blocklistRepository: new FakeDataBlocklistRepository(),
  sirenTier: new InMemorySirenTier(),
  dateProvider: new RealDateProvider(),
  installedAppRepository: new FakeDataInstalledAppsRepository(),
  sirensRepository: new FakeDataSirensRepository(),
}
