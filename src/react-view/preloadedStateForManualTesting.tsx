import { dependencies } from './dependencies.ts'
import {
  stateBuilderProvider,
  StateBuilderProvider,
} from '../core/_tests_/state-builder.ts'
import { buildBlockSession } from '../core/_tests_/data-builders/block-session.builder.ts'
import { FakeDataBlockSessionRepository } from '../infra/block-session-repository/fake-data.block-session.repository.ts'

export async function preloadedStateForManualTesting() {
  const blocklists = await dependencies.blocklistRepository.getBlocklists()

  const now = dependencies.dateProvider.getNow()
  const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000)

  const preloadedState: StateBuilderProvider = stateBuilderProvider()
  const preloadedBlockSessions = [
    buildBlockSession({
      name: 'Working time',
      startedAt: dependencies.dateProvider.toHHmm(now),
      endedAt: dependencies.dateProvider.toHHmm(oneMinuteFromNow),
    }),
    buildBlockSession({
      name: 'Sleeping time',
      startedAt: dependencies.dateProvider.toHHmm(oneMinuteFromNow),
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
