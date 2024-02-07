import { BlockSession } from '../block-session'

export interface BlockSessionRepository {
  getCurrentSessions(): Promise<BlockSession[]>
}
