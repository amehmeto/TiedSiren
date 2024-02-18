import { ViewModelBlockSession } from '../../core/block-session/view-model-block-session.ts'
import { BlockSessionRepository } from '../../core/block-session/ports/block-session.repository.ts'
import uuid from 'react-native-uuid'

import { BlockSession } from '../../core/block-session/block.session.ts'

export class FakeDataBlockSessionRepository implements BlockSessionRepository {
  blockSessions: Map<string, BlockSession> = new Map()

  getCurrentSessions(): Promise<ViewModelBlockSession[]> {
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

  createSession(sessionPayload: BlockSession): Promise<BlockSession> {
    this.blockSessions.set(sessionPayload.id, sessionPayload)
    const createdSession = this.blockSessions.get(sessionPayload.id)
    if (!createdSession) throw new Error('Session not created')
    return Promise.resolve(createdSession)
  }
}
