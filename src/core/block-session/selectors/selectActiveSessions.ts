import { BlockSession, blockSessionAdapter } from '../block.session.ts'
import { isBefore } from 'date-fns'
import { EntityState } from '@reduxjs/toolkit'
import { DateProvider } from '../../../infra/date-provider/port.date-provider.ts'

export function isActive(dateProvider: DateProvider, session: BlockSession) {
  const start =
    session.startedAt > session.endedAt
      ? dateProvider.recoverYesterdayDate(session.startedAt)
      : dateProvider.recoverDate(session.startedAt)
  const end = dateProvider.recoverDate(session.endedAt)
  const now = dateProvider.getNow()
  return !isBefore(now, start) && isBefore(now, end)
}

export const selectActiveSessions = (
  dateProvider: DateProvider,
  blockSession: EntityState<BlockSession, string>,
): BlockSession[] => {
  return blockSessionAdapter
    .getSelectors()
    .selectAll(blockSession)
    .filter((session) => isActive(dateProvider, session))
}

export const selectScheduledSessions = (
  dateProvider: DateProvider,
  blockSession: EntityState<BlockSession, string>,
): BlockSession[] => {
  return blockSessionAdapter
    .getSelectors()
    .selectAll(blockSession)
    .filter((session) => !isActive(dateProvider, session))
}
