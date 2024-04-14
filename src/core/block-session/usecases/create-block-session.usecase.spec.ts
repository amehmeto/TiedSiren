import { beforeEach, describe, it, expect } from 'vitest'
import { blockSessionFixture } from './block-session.fixture.ts'
import { buildBlocklist } from '../../_tests_/data-builders/blocklist.builder.ts'
import {
  facebookAndroidSiren,
  instagramAndroidSiren,
} from '../../_tests_/data-builders/android-siren.builder.ts'
import { CreateBlockSessionPayload } from './create-block-session.usecase.ts'

describe('Feature: Creating a block session', () => {
  let fixture: ReturnType<typeof blockSessionFixture>

  beforeEach(() => {
    fixture = blockSessionFixture()
  })

  it('should create a block session', async () => {
    const blockSessionPayload: CreateBlockSessionPayload = {
      name: 'Sleeping time',
      blocklists: [
        buildBlocklist({
          id: 'blocklist-id',
          name: 'Distraction',
          sirens: {
            android: [instagramAndroidSiren, facebookAndroidSiren],
            ios: [],
            linux: [],
            macos: [],
            windows: [],
            websites: [],
            keywords: [],
          },
        }),
      ],
      devices: [
        {
          id: 'device-id',
          type: 'ios',
          name: 'Huawei P30',
        },
      ],
      startedAt: '00:10',
      endedAt: '00:30',
    }
    const now = new Date()
    now.setUTCHours(0, 0, 0, 0)
    fixture.given.nowIs(now)

    await fixture.when.creatingBlockSession(blockSessionPayload)

    fixture.then.notificationsShouldBeScheduled([
      {
        title: 'Tied Siren',
        body: `Block session "Sleeping time" has started`,
        trigger: {
          seconds: 10 * 60,
        },
      },
      {
        title: 'Tied Siren',
        body: `Block session "Sleeping time" has ended`,
        trigger: {
          seconds: 30 * 60,
        },
      },
    ])
    fixture.then.blockSessionsFromStoreShouldBe([
      {
        id: expect.any(String),
        name: 'Sleeping time',
        blocklists: [
          buildBlocklist({
            id: 'blocklist-id',
            name: 'Distraction',
            sirens: {
              android: [instagramAndroidSiren, facebookAndroidSiren],
              ios: [],
              linux: [],
              macos: [],
              windows: [],
              websites: [],
              keywords: [],
            },
          }),
        ],
        devices: [
          {
            id: 'device-id',
            type: 'ios',
            name: 'Huawei P30',
          },
        ],
        startedAt: '00:10',
        endedAt: '00:30',
        startNotificationId: expect.any(String),
        endNotificationId: expect.any(String),
      },
    ])
  })
})
