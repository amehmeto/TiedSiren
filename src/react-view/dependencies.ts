import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { InstalledAppRepository } from '../core/installed-app/ports/installed-app.repository'
import { BlockSessionRepository } from '../core/block-session/ports/block-session.repository'
import { FakeDataBlockSessionRepository } from '../infra/block-session-repository/fake-data.block-session.repository'
import { BlocklistRepository } from '../core/blocklist/ports/blocklist.repository'
import { FakeDataBlocklistRepository } from '../infra/blocklist-repository/fake-data.blocklist.repository'
import { DeviceRepository } from '../core/device/ports/device.repository'
import { FakeDataDeviceRepository } from '../infra/device-repository/fake-data.device.repository'
import { DateProvider } from '../infra/date-provider/port.date-provider.ts'
import { RealDateProvider } from '../infra/date-provider/real.date-provider.ts'

export const installedAppsRepository: InstalledAppRepository =
  new FakeDataInstalledAppsRepository()
export const blockSessionRepository: BlockSessionRepository =
  new FakeDataBlockSessionRepository()
export const blocklistRepository: BlocklistRepository =
  new FakeDataBlocklistRepository()
export const deviceRepository: DeviceRepository = new FakeDataDeviceRepository()
export const dateProvider: DateProvider = new RealDateProvider()
