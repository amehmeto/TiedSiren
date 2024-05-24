import { BlockSession, blockSessionAdapter } from '../block.session.ts'
import { EntityState } from '@reduxjs/toolkit'
import { DateProvider } from '../../ports/port.date-provider.ts'
import { isActive } from './isActive.ts'

export const selectActiveSessions = (
  dateProvider: DateProvider,
  blockSession: EntityState<BlockSession, string>,
): BlockSession[] => {
  return blockSessionAdapter
    .getSelectors()
    .selectAll(blockSession)
    .filter((session) => isActive(dateProvider, session))
}
