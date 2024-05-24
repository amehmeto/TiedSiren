import { BlockSession } from '../block-session/block.session.ts'
import {
  CreatePayload,
  UpdatePayload,
} from '../../infra/generic-in-memory.repository.ts'

export interface BlockSessionRepository {
  create(sessionPayload: CreatePayload<BlockSession>): Promise<BlockSession>
  findAll(): Promise<BlockSession[]>
  findById(sessionId: string): Promise<BlockSession>
  update(session: UpdatePayload<BlockSession>): Promise<void>
  delete(sessionId: string): Promise<void>
}
