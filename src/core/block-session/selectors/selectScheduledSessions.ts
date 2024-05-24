import { DateProvider } from '../../ports/port.date-provider.ts'
import { EntityState } from '@reduxjs/toolkit'
import { BlockSession, blockSessionAdapter } from '../block.session.ts'
import { isActive } from './isActive.ts'

export const selectScheduledSessions = (
  dateProvider: DateProvider,
  blockSession: EntityState<BlockSession, string>,
): BlockSession[] => {
  return blockSessionAdapter
    .getSelectors()
    .selectAll(blockSession)
    .filter((session) => !isActive(dateProvider, session))
}
