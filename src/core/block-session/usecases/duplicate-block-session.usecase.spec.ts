import { beforeEach, describe, it, expect } from 'vitest'
import { blockSessionFixture } from './block-session.fixture.ts'
import { buildBlockSession } from '../../_tests_/data-builders/block-session.builder.ts'

describe('Feature: Duplicating a block session', () => {
  let fixture: ReturnType<typeof blockSessionFixture>

  beforeEach(() => {
    fixture = blockSessionFixture()
  })

  it('should duplicate a block session', async () => {
    const givenBlockSession = buildBlockSession()

    fixture.given.existingBlockSession(givenBlockSession)

    await fixture.when.duplicatingBlockSession({
      id: givenBlockSession.id,
      name: 'Copy of ' + givenBlockSession.name,
    })

    fixture.then.retrievedBlockSessionsFromStoreShouldBe([
      givenBlockSession,
      {
        ...givenBlockSession,
        id: expect.any(String),
        name: 'Copy of ' + givenBlockSession.name,
      },
    ])
  })
})
