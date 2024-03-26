import { BlockSessionRepository } from '../../core/block-session/ports/block-session.repository.ts'
import uuid from 'react-native-uuid'

import { BlockSession } from '../../core/block-session/block.session.ts'
import {
  facebookAndroidSiren,
  instagramAndroidSiren,
} from '../../core/_tests_/data-builders/android-siren.builder.ts'
import { buildBlockSession } from '../../core/_tests_/data-builders/block-session.builder.ts'

export class FakeDataBlockSessionRepository implements BlockSessionRepository {
  blockSessions: Map<string, BlockSession> = new Map(
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

  getCurrentSessions(): Promise<BlockSession[]> {
    return Promise.resolve(Array.from(this.blockSessions.values()))
  }

  createSession(sessionPayload: BlockSession): Promise<BlockSession> {
    this.blockSessions.set(sessionPayload.id, sessionPayload)
    const createdSession = this.blockSessions.get(sessionPayload.id)
    if (!createdSession) throw new Error('Session not created')
    return Promise.resolve(createdSession)
  }
}
