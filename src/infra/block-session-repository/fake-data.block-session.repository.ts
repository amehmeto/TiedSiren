import { BlockSessionRepository } from '../../core/block-session/ports/block-session.repository.ts'
import uuid from 'react-native-uuid'

import { BlockSession } from '../../core/block-session/block.session.ts'

export class FakeDataBlockSessionRepository implements BlockSessionRepository {
  blockSessions: Map<string, BlockSession> = new Map()

  getCurrentSessions(): Promise<BlockSession[]> {
    return Promise.resolve([
      {
        id: String(uuid.v4()),
        name: 'Sleeping time',
        minutesLeft: 'Ends in about 1 hour',
        blocklists: [
          {
            id: 'blocklist-id',
            name: 'Distractions',
            totalBlocks: 10,
          },
          {
            id: 'blocklist-id-2',
            name: 'Games',
            totalBlocks: 10,
          },
        ],
        devices: [
          {
            id: 'device-id',
            type: 'android',
            name: 'Huawei P30',
          },
          {
            id: 'device-id-2',
            type: 'android',
            name: 'Google Pixel 3a',
          },
        ],
        start: '10:48:00',
        end: '13:58:00',
      },
      {
        id: String(uuid.v4()),
        name: 'Playing time',
        minutesLeft: 'Ends in about 1 hour',
        blocklists: [
          {
            id: 'blocklist-id',
            name: 'Distractions',
            totalBlocks: 10,
          },
          {
            id: 'blocklist-id-2',
            name: 'Games',
            totalBlocks: 10,
          },
        ],
        devices: [
          {
            id: 'device-id',
            type: 'android',
            name: 'Huawei P30',
          },
          {
            id: 'device-id-2',
            type: 'android',
            name: 'Google Pixel 3a',
          },
        ],
        start: '10:48:00',
        end: '13:58:00',
      },
      {
        id: String(uuid.v4()),
        name: 'Sleeping time',
        minutesLeft: 'Ends in about 1 hour',
        blocklists: [
          {
            id: 'blocklist-id',
            name: 'Distractions',
            totalBlocks: 10,
          },
          {
            id: 'blocklist-id-2',
            name: 'Games',
            totalBlocks: 10,
          },
        ],
        devices: [
          {
            id: 'device-id',
            type: 'android',
            name: 'Huawei P30',
          },
          {
            id: 'device-id-2',
            type: 'android',
            name: 'Google Pixel 3a',
          },
        ],
        start: '10:48:00',
        end: '13:58:00',
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
