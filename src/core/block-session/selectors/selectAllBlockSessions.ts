import { EntityState } from '@reduxjs/toolkit'
import { BlockSession, blockSessionAdapter } from '../block.session.ts'

export const selectAllBlockSessions = (
  blockSession: EntityState<BlockSession, string>,
) => blockSessionAdapter.getSelectors().selectAll(blockSession)
