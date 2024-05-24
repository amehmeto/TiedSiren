import { BlockSessionRepository } from '../ports/block-session.repository.ts'
import { BlocklistRepository } from '../ports/blocklist.repository.ts'
import { SirenTier } from '../ports/siren.tier.ts'
import { DateProvider } from '../../infra/date-provider/port.date-provider.ts'
import { InstalledAppRepository } from '../ports/installed-app.repository.ts'
import { SirensRepository } from '../siren/ports/sirens.repository.ts'
import { NotificationService } from '../../infra/notification-service/notification.service.ts'
import { BackgroundTaskService } from '../ports/background-task.service.ts'

export type Dependencies = {
  blockSessionRepository: BlockSessionRepository
  blocklistRepository: BlocklistRepository
  sirenTier: SirenTier
  dateProvider: DateProvider
  installedAppRepository: InstalledAppRepository
  sirensRepository: SirensRepository
  notificationService: NotificationService
  backgroundTaskService: BackgroundTaskService
}
