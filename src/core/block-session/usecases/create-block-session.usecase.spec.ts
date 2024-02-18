import { beforeEach, describe, it } from 'vitest'
import { createBlockSessionFixture } from './create-block-session.fixture.ts'
import { BlockSession } from '../block.session.ts'

describe('Feature: Creating a block session', () => {
  let fixture: ReturnType<typeof createBlockSessionFixture>

  beforeEach(() => {
    fixture = createBlockSessionFixture()
  })

  it('should create a block session', () => {
    const blockSessionPayload: BlockSession = {
      id: 'block-session-id',
      name: 'block-session-name',
      blocklists: [
        { id: 'blocklist-id', name: 'Distraction', totalBlocks: 10 },
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

    fixture.when.creatingBlockSession(blockSessionPayload)

    fixture.then.blockSessionsShouldBe([
      {
        id: 'block-session-id',
        name: 'block-session-name',
        blocklists: [
          { id: 'blocklist-id', name: 'blocklist-name', totalBlocks: 10 },
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
      },
    ])
  })
})
