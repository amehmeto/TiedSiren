import { BlockSession } from '../../core/block-session/block-session'
import { BlockSessionRepository } from '../../core/block-session/ports/block-session.repository'

export class FakeDataCurrentSessionRepository
  implements BlockSessionRepository
{
  getCurrentSessions(): Promise<BlockSession[]> {
    return Promise.resolve([
      { name: 'Sleeping time', minutesLeft: 22, blocklists: 2, devices: 1 },
      { name: 'Necessary Evils', minutesLeft: 220, blocklists: 6, devices: 5 },
      { name: 'Test time', minutesLeft: 34, blocklists: 2, devices: 4 },
    ])
  }
}
