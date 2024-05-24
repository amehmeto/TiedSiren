import { dependencies } from './dependencies.ts'
import {
  stateBuilderProvider,
  StateBuilderProvider,
} from '../core/_tests_/state-builder.ts'
import { buildBlockSession } from '../core/_tests_/data-builders/block-session.builder.ts'
import { FakeDataBlockSessionRepository } from '../infra/block-session-repository/fake-data.block-session.repository.ts'
import { createStore } from '../core/_redux_/createStore.ts'

export async function preloadedStateForManualTesting() {
  const { dateProvider, blocklistRepository, blockSessionRepository } =
    dependencies
  const blocklists = await blocklistRepository.getBlocklists()

  const preloadedState: StateBuilderProvider = stateBuilderProvider()
  const preloadedBlockSessions = [
    buildBlockSession({
      name: 'Working time',
      startedAt: dateProvider.getHHmmMinutesFromNow(0),
      endedAt: dateProvider.getHHmmMinutesFromNow(1),
    }),
    buildBlockSession({
      name: 'Sleeping time',
      startedAt: dateProvider.getHHmmMinutesFromNow(1),
    }),
    buildBlockSession({
      name: 'Break time',
      startedAt: dateProvider.getHHmmMinutesFromNow(5),
      endedAt: dateProvider.getHHmmMinutesFromNow(10),
    }),
  ]
  preloadedState.setState((builder) =>
    builder
      .withBlockSessions(preloadedBlockSessions)
      .withBlocklists(blocklists),
  )
  ;(blockSessionRepository as FakeDataBlockSessionRepository).entities =
    new Map(
      preloadedBlockSessions.map((blockSession) => [
        blockSession.id,
        blockSession,
      ]),
    )
  return preloadedState
}

/*export const storePromise = preloadedStateForManualTesting().then(
  (preloadedState) => createStore(dependencies, preloadedState.getState()),
)*/

export const storePromise = Promise.resolve(createStore(dependencies))
