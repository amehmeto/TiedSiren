import { describe, it, beforeEach } from 'vitest'
import { sirensFixture } from './sirens.fixture.ts'
import { buildSirens } from '../../_tests_/data-builders/sirens.builder.ts'

describe('Feature: Adding keyword to sirens', () => {
  let fixture: ReturnType<typeof sirensFixture>

  beforeEach(() => {
    fixture = sirensFixture()
  })

  it('should add keyword to sirens', async () => {
    const initialSirens = buildSirens({
      keywords: ['mma', 'ufc'],
    })
    fixture.given.existingAvailableSirens(initialSirens)

    await fixture.when.addingKeywordToSirens('boxe')

    fixture.then.availableSirensShouldBeStoredAs(
      buildSirens({
        ...initialSirens,
        keywords: [...initialSirens.keywords, 'boxe'],
      }),
    )
    await fixture.then.keywordShouldBeSaved('boxe')
  })
})
