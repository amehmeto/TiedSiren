import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { RemoteDeviceRepository } from '../core/ports/remote-device.repository.ts'
import { FakeDataDeviceRepository } from '../infra/device-repository/fake-data.device.repository'
import { RealDateProvider } from '../infra/date-provider/real.date-provider.ts'
import { Dependencies } from '../core/_redux_/dependencies.ts'
import { FakeDataSirensRepository } from '../infra/sirens-repository/fake-data.sirens-repository.ts'
import { ExpoNotificationService } from '../infra/notification-service/expo.notification.service.ts'
import { InMemorySirenTier } from '../infra/siren-tier/in-memory-siren.tier.ts'
import { RealBackgroundTaskService } from '../infra/background-task-service/real.background-task.service.ts'
import { PouchdbBlockSessionRepository } from '../infra/block-session-repository/pouchdb.block-session.repository.ts'
import { PouchdbBlocklistRepository } from '../infra/blocklist-repository/pouchdb.blocklist.repository.ts'

export const deviceRepository: RemoteDeviceRepository =
  new FakeDataDeviceRepository()

export const dependencies: Dependencies = {
  blockSessionRepository: new PouchdbBlockSessionRepository(),
  blocklistRepository: new PouchdbBlocklistRepository(),
  sirenTier: new InMemorySirenTier(),
  dateProvider: new RealDateProvider(),
  installedAppRepository: new FakeDataInstalledAppsRepository(),
  sirensRepository: new FakeDataSirensRepository(),
  notificationService: new ExpoNotificationService(),
  backgroundTaskService: new RealBackgroundTaskService(),
}
