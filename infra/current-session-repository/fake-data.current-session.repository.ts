import { CurrentSession } from '../../core/current-session/current-session'
import { CurrentSessionRepository } from '../../core/current-session/ports/current-session.repository'

export class FakeDataCurrentSessionRepository
  implements CurrentSessionRepository
{
  getCurrentSessions(): Promise<CurrentSession[]> {
    return Promise.resolve([
      { name: 'Sleeping time', minutesLeft: 22, blocklists: 2, devices: 1 },
      { name: 'Necessary Evils', minutesLeft: 220, blocklists: 6, devices: 5 },
      { name: 'Test time', minutesLeft: 34, blocklists: 2, devices: 4 },
    ])
  }
}
