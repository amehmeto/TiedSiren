import { expect } from 'vitest'
import { Sirens } from '../blocklist.ts'
import { AppStore } from '../../_redux_/createStore.ts'
import { tieSirens } from './tie-sirens.usecase.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { InMemorySirenTier } from '../../../infra/siren-binder/in-memory-siren.tier.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'
import { BlockSession } from '../../block-session/block.session.ts'
import { StubDateProvider } from '../../../infra/date-provider/stub.date-provider.ts'

export function tieSirensFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  const sirenTier = new InMemorySirenTier()
  const dateProvider = new StubDateProvider()

  return {
    given: {
      activeBlockSessions(blockSessions: BlockSession[]) {
        dateProvider.now = new Date('2021-01-01T14:30:00')
        testStateBuilderProvider.setState((builder) =>
          builder.withBlockSessions(blockSessions),
        )
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
