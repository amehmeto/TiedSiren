import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { InstalledAppRepository } from '../core/installed-app/ports/installed-app.repository'
import { CurrentSessionRepository } from '../core/current-session/ports/current-session.repository'
import { FakeDataCurrentSessionRepository } from '../infra/current-session-repository/fake-data.current-session.repository'

export const installedAppsRepository: InstalledAppRepository =
  new FakeDataInstalledAppsRepository()
export const currentSessionRepository: CurrentSessionRepository =
  new FakeDataCurrentSessionRepository()
