import { beforeEach, describe, it } from 'vitest'
import { blockSessionFixture } from './block-session.fixture.ts'
import { BlockSession } from '../block.session.ts'
import { buildBlockSession } from '../../_tests_/data-builders/block-session.builder.ts'

describe('Feature: Updating block session', () => {
  let fixture: ReturnType<typeof blockSessionFixture>

  beforeEach(() => {
    fixture = blockSessionFixture()
  })

  it('should update a block session', async () => {
    const updateBlockSessionPayload: Partial<BlockSession> &
      Required<Pick<BlockSession, 'id'>> = {
      id: 'block-session-id',
      name: 'Working time',
    }

    const existingBlockSession = buildBlockSession({
      id: 'block-session-id',
      name: 'Sleeping time',
    })
    fixture.given.existingBlockSession(existingBlockSession)

    await fixture.when.updatingBlockSession(updateBlockSessionPayload)

    fixture.then.blockSessionShouldBeStoredAs({
      ...existingBlockSession,
      name: 'Working time',
    })
  })
})
