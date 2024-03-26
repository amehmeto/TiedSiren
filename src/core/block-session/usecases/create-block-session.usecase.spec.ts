import { beforeEach, describe, it } from 'vitest'
import { createBlockSessionFixture } from './create-block-session.fixture.ts'
import { BlockSession } from '../block.session.ts'
import { buildBlocklist } from '../../_tests_/data-builders/blocklist.builder.ts'
import {
  facebookAndroidSiren,
  instagramAndroidSiren,
} from '../../_tests_/data-builders/android-siren.builder.ts'

describe('Feature: Creating a block session', () => {
  let fixture: ReturnType<typeof createBlockSessionFixture>

  beforeEach(() => {
    fixture = createBlockSessionFixture()
  })

  it('should create a block session', async () => {
    const blockSessionPayload: BlockSession = {
      id: 'block-session-id',
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
      start: '2021-01-01T00:00:00Z',
      end: '2021-01-01T00:00:00Z',
    }

    await fixture.when.creatingBlockSession(blockSessionPayload)

    fixture.then.blockSessionsShouldBeStoredAs({
      id: 'block-session-id',
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
      start: '2021-01-01T00:00:00Z',
      end: '2021-01-01T00:00:00Z',
    })
  })
})
