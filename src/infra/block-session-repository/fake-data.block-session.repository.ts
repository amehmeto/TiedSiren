import { BlockSessionRepository } from '../../core/block-session/ports/block-session.repository.ts'
import uuid from 'react-native-uuid'

import { BlockSession } from '../../core/block-session/block.session.ts'
import {
  facebookAndroidSiren,
  instagramAndroidSiren,
} from '../../core/_tests_/data-builders/android-siren.builder.ts'
import { buildBlockSession } from '../../core/_tests_/data-builders/block-session.builder.ts'
import { GenericInMemoryRepository } from '../generic-in-memory.repository.ts'

export class FakeDataBlockSessionRepository
  extends GenericInMemoryRepository<BlockSession>
  implements BlockSessionRepository
{
  entities: Map<string, BlockSession> = new Map(
    [
      buildBlockSession({
        id: String(uuid.v4()),
        name: 'Sleeping time',
        blocklists: [
          {
            id: 'blocklist-id',
            name: 'Distractions',
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: ['twitter.com'],
              keywords: ['cat videos'],
            },
          },
          {
            id: 'blocklist-id-2',
            name: 'Games',
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: ['twitter.com'],
              keywords: ['cat videos'],
            },
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
      }),
      {
        id: String(uuid.v4()),
        name: 'Playing time',
        minutesLeft: 'Ends in about 1 hour',
        blocklists: [
          {
            id: 'blocklist-id',
            name: 'Distractions',
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: ['twitter.com'],
              keywords: ['cat videos'],
            },
          },
          {
            id: 'blocklist-id-2',
            name: 'Games',
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: ['twitter.com'],
              keywords: ['cat videos'],
            },
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
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: ['twitter.com'],
              keywords: ['cat videos'],
            },
          },
          {
            id: 'blocklist-id-2',
            name: 'Games',
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: ['twitter.com'],
              keywords: ['cat videos'],
            },
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
    ].map((blockSession) => [blockSession.id, blockSession]),
  )

  delete(sessionId: string): Promise<void> {
    return super.delete(sessionId)
  }

  findById(sessionId: string): Promise<BlockSession> {
    return super.findById(sessionId)
  }

  update(
    session: Partial<BlockSession> & Required<Pick<BlockSession, 'id'>>,
  ): Promise<void> {
    return super.update(session)
  }

  getCurrentSessions(): Promise<BlockSession[]> {
    return Promise.resolve(Array.from(this.entities.values()))
  }

  create(sessionPayload: Omit<BlockSession, 'id'>): Promise<BlockSession> {
    return super.create(sessionPayload)
  }
}
