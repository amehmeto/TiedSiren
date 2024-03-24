import { describe, it, beforeEach } from 'vitest'
import { createAggregatedActiveBlocklistFixture } from './create-aggregated-active-blocklist.fixture.ts'
import { buildBlocklist } from '../../_tests_/data-builders/blocklist.builder.ts'

describe('Feature: Creating an aggregated active blocklist', () => {
  let fixture: ReturnType<typeof createAggregatedActiveBlocklistFixture>

  beforeEach(() => {
    fixture = createAggregatedActiveBlocklistFixture()
  })

  it('should create an aggregated active blocklist', async () => {
    fixture.given.existingBlocklists([
      buildBlocklist({
        blocks: {
          apps: {
            android: ['Instagram', 'Facebook'],
            ios: [],
            linux: [],
            macos: [],
            windows: [],
          },
          websites: [],
          keywords: [],
        },
      }),
      buildBlocklist({
        blocks: {
          apps: {
            android: [],
            ios: [],
            linux: [],
            macos: [],
            windows: [],
          },
          websites: ['facebook.com', 'instagram.com'],
          keywords: [],
        },
      }),
    ])

    await fixture.when.createAggregatedActiveBlocklist()

    fixture.then.aggregatedActiveBlocklistShouldBeStoredAs(
      buildBlocklist({
        blocks: {
          apps: {
            android: ['Instagram', 'Facebook'],
            ios: [],
            linux: [],
            macos: [],
            windows: [],
          },
          websites: ['facebook.com', 'instagram.com'],
          keywords: [],
        },
      }),
    )
  })
})
