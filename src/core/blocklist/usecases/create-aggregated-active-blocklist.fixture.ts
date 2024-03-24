import { expect } from 'vitest'
import { Blocklist } from '../blocklist.ts'
import { AppStore } from '../../_redux_/createStore.ts'
import { createAggregatedActiveBlocklist } from './create-aggregated-active-blocklist.usecase.ts'
import { createTestStore } from '../../_tests_/createTestStore.ts'
import { InMemorySirenTier } from '../../../infra/siren-binder/in-memory-siren.tier.ts'
import { stateBuilderProvider } from '../../_tests_/state-builder.ts'

export function createAggregatedActiveBlocklistFixture(
  testStateBuilderProvider = stateBuilderProvider(),
) {
  const sirenTier = new InMemorySirenTier()

  return {
    given: {
      existingBlocklists(blocklists: Blocklist[]) {
        testStateBuilderProvider.setState((builder) =>
          builder.withBlocklists(blocklists),
        )
      },
    },
    when: {
      createAggregatedActiveBlocklist: async () => {
        const state = testStateBuilderProvider.getState()
        const store: AppStore = createTestStore({ sirenTier }, state)
        await store.dispatch(createAggregatedActiveBlocklist())
      },
    },
    then: {
      aggregatedActiveBlocklistShouldBeStoredAs(expectedBlocklist: Blocklist) {
        expect(sirenTier.tiedSirens).toStrictEqual(expectedBlocklist)
      },
    },
  }
}
