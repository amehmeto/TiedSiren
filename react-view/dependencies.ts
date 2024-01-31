import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { InstalledAppsRepository } from '../core/installed-apps/ports/installed-apps.repository'

export const installedAppsRepository: InstalledAppsRepository =
  new FakeDataInstalledAppsRepository()
