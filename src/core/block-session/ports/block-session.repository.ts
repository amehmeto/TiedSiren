import { BlockSession } from '../block.session.ts'

export interface BlockSessionRepository {
  getCurrentSessions(): Promise<BlockSession[]>
  create(sessionPayload: Omit<BlockSession, 'id'>): Promise<BlockSession>
  delete(sessionId: string): Promise<void>
  findById(sessionId: string): Promise<BlockSession>
  update(session: BlockSession): Promise<void>
}
