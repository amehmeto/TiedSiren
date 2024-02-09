import { BlockSession } from '../../core/block-session/block-session'
import { BlockSessionRepository } from '../../core/block-session/ports/block-session.repository'
import uuid from 'react-native-uuid'

export class FakeDataBlockSessionRepository implements BlockSessionRepository {
  getCurrentSessions(): Promise<BlockSession[]> {
    return Promise.resolve([
      {
        id: String(uuid.v4()),
        name: 'Sleeping time',
        minutesLeft: 22,
        blocklists: 2,
        devices: 1,
      },
      {
        id: String(uuid.v4()),
        name: 'Necessary Evils',
        minutesLeft: 220,
        blocklists: 6,
        devices: 5,
      },
      {
        id: String(uuid.v4()),
        name: 'Test time',
        minutesLeft: 34,
        blocklists: 2,
        devices: 4,
      },
    ])
  }
}
