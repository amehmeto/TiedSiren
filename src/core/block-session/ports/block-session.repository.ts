import { ViewModelBlockSession } from '../view-model-block-session.ts'

import { BlockSession } from '../block.session.ts'

export interface BlockSessionRepository {
  getCurrentSessions(): Promise<ViewModelBlockSession[]>
  createSession(sessionPayload: BlockSession): Promise<BlockSession>
}
