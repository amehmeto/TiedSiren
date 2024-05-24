import { Blocklist } from '../blocklist.ts'
import {
  CreatePayload,
  UpdatePayload,
} from '../../../infra/generic-in-memory.repository.ts'

export interface BlocklistRepository {
  findAll(): Promise<Blocklist[]>
  create(payload: CreatePayload<Blocklist>): Promise<Blocklist>
  update(payload: UpdatePayload<Blocklist>): Promise<void>
  findById(blocklistId: string): Promise<Blocklist>
  delete(blocklistId: string): Promise<void>
}
