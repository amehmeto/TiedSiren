import { beforeEach, describe, it } from 'vitest'
import { createBlocklistFixture } from './create-blocklist.fixture.ts'

describe('Feature: Creating a blocklist', () => {
  let fixture: ReturnType<typeof createBlocklistFixture>

  beforeEach(() => {
    fixture = createBlocklistFixture()
  })

  it('should create a blocklist', async () => {
    const blocklistPayload = {
      id: 'blocklist-id',
      name: 'Distraction',
      blocks: {
        apps: {
          android: ['Instagram', 'Facebook'],
        },
        websites: ['facebook.com', 'instagram.com'],
        keywords: ['social', 'media'],
      },
    }

    await fixture.when.creatingBlocklist(blocklistPayload)

    fixture.then.blocklistShouldBeStoredAs({
      id: 'blocklist-id',
      name: 'Distraction',
      blocks: {
        apps: {
          android: ['Instagram', 'Facebook'],
        },
        websites: ['facebook.com', 'instagram.com'],
        keywords: ['social', 'media'],
      },
    })
  })
})
