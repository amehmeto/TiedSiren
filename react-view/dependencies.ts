import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { InstalledAppRepository } from '../core/installed-app/ports/installed-app.repository'

export const installedAppsRepository: InstalledAppRepository =
  new FakeDataInstalledAppsRepository()
