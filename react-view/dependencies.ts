import { FakeDataInstalledAppsRepository } from '../infra/installed-apps-repository/fake-data.installed-apps.repository'
import { InstalledAppRepository } from '../core/installed-app/ports/installed-app.repository'
import { FakeDataCurrentSessionRepository } from '../infra/current-session-repository/fake-data.current-session.repository'
import { BlockSessionRepository } from '../core/block-session/ports/block-session.repository'

export const installedAppsRepository: InstalledAppRepository =
  new FakeDataInstalledAppsRepository()
export const blockSessionRepository: BlockSessionRepository =
  new FakeDataCurrentSessionRepository()
