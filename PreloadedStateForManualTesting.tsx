import { dependencies } from './src/react-view/dependencies.ts'
import {
  stateBuilderProvider,
  StateBuilderProvider,
} from './src/core/_tests_/state-builder.ts'
import { buildBlockSession } from './src/core/_tests_/data-builders/block-session.builder.ts'
import { toHHmm } from './src/react-view/screens/Home/shared/SelectTime.tsx'
import { FakeDataBlockSessionRepository } from './src/infra/block-session-repository/fake-data.block-session.repository.ts'

export async function preloadedStateForManualTesting() {
  const blocklists = await dependencies.blocklistRepository.getBlocklists()

  const now = dependencies.dateProvider.getNow()
  const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000)

  const preloadedState: StateBuilderProvider = stateBuilderProvider()
  const preloadedBlockSessions = [
    buildBlockSession({
      name: 'Working time',
      start: toHHmm(now),
      end: toHHmm(oneMinuteFromNow),
    }),
    buildBlockSession({
      name: 'Sleeping time',
      start: toHHmm(oneMinuteFromNow),
    }),
  ]
  preloadedState.setState((builder) =>
    builder
      .withBlockSessions(preloadedBlockSessions)
      .withBlocklists(blocklists),
  )
  ;(
    dependencies.blockSessionRepository as FakeDataBlockSessionRepository
  ).entities = new Map(
    preloadedBlockSessions.map((blockSession) => [
      blockSession.id,
      blockSession,
    ]),
  )
  return preloadedState
}
