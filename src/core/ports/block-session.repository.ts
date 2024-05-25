import { BlockSession } from '../block-session/block.session.ts'
import { UpdatePayload } from './update.payload.ts'
import { CreatePayload } from './create.payload.ts'

export interface BlockSessionRepository {
  create(sessionPayload: CreatePayload<BlockSession>): Promise<BlockSession>
  findAll(): Promise<BlockSession[]>
  findById(sessionId: string): Promise<BlockSession>
  update(session: UpdatePayload<BlockSession>): Promise<void>
  delete(sessionId: string): Promise<void>
}
