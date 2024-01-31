import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { InstalledAppRepository } from '../core/installed-apps/ports/installed-app.repository'

export const installedAppsRepository: InstalledAppRepository =
  new FakeDataInstalledAppsRepository()
