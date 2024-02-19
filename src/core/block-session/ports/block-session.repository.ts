import { BlockSession } from '../block.session.ts'

export interface BlockSessionRepository {
  getCurrentSessions(): Promise<BlockSession[]>
  createSession(sessionPayload: BlockSession): Promise<BlockSession>
}
