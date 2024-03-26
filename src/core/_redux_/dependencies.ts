import { BlockSessionRepository } from '../block-session/ports/block-session.repository.ts'
import { BlocklistRepository } from '../blocklist/ports/blocklist.repository.ts'
import { SirenTier } from '../blocklist/ports/sirenTier.ts'
import { DateProvider } from '../../infra/date-provider/port.date-provider.ts'
import { InstalledAppRepository } from '../installed-app/ports/installed-app.repository.ts'

export type Dependencies = {
  blockSessionRepository: BlockSessionRepository
  blocklistRepository: BlocklistRepository
  sirenTier: SirenTier
  dateProvider: DateProvider
  installedAppRepository: InstalledAppRepository
}
