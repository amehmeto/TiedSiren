import { BlockSession, blockSessionAdapter } from '../block.session.ts'
import { isBefore } from 'date-fns'
import { EntityState } from '@reduxjs/toolkit'

export function isActive(now: Date, start: Date, end: Date) {
  return !isBefore(now, start) && isBefore(now, end)
}

export function recoverDate(now: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number)

  const todayWithNewTime = new Date(now.getTime())
  todayWithNewTime.setHours(hours)
  todayWithNewTime.setMinutes(minutes)

  return todayWithNewTime
}

export const selectActiveSessions = (
  now: Date,
  blockSession: EntityState<BlockSession, string>,
): BlockSession[] => {
  return blockSessionAdapter
    .getSelectors()
    .selectAll(blockSession)
    .filter((session) => {
      const start = recoverDate(now, session.startedAt)
      const end = recoverDate(now, session.endedAt)
      return isActive(now, start, end)
    })
}

export const selectScheduledSessions = (
  now: Date,
  blockSession: EntityState<BlockSession, string>,
): BlockSession[] => {
  return blockSessionAdapter
    .getSelectors()
    .selectAll(blockSession)
    .filter((session) => {
      const start = recoverDate(now, session.startedAt)
      const end = recoverDate(now, session.endedAt)
      return !isActive(now, start, end)
    })
}
