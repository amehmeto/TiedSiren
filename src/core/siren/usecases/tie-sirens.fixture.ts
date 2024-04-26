import { expect } from 'vitest'
import { AppStore } from '../../_redux_/createStore.ts'
import { tieSirens } from './tie-sirens.usecase.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'
import { BlockSession } from '../../block-session/block.session.ts'
import { StubDateProvider } from '../../../infra/date-provider/stub.date-provider.ts'
import { Sirens } from '../sirens.ts'
import { InMemorySirenTier } from '../../../infra/siren-tier/in-memory-siren.tier.ts'

export function tieSirensFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  const sirenTier = new InMemorySirenTier()
  const dateProvider = new StubDateProvider()

  return {
    given: {
      activeBlockSessions(blockSessions: BlockSession[]) {
        testStateBuilderProvider.setState((builder) =>
          builder.withBlockSessions(blockSessions),
        )
      },
      nowIs({ hours, minutes }: { hours: number; minutes: number }) {
        const date = new Date()
        date.setUTCHours(hours, minutes, 0, 0)
        dateProvider.now = date
      },
    },
    when: {
      tieSirens() {
        const store: AppStore = createTestStore(
          { sirenTier, dateProvider },
          testStateBuilderProvider.getState(),
        )
        return store.dispatch(tieSirens())
      },
    },
    then: {
      sirensShouldTied(expectedSirens: Sirens) {
        expect(sirenTier.sirens).toStrictEqual(expectedSirens)
      },
    },
  }
}
