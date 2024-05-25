import { Blocklist } from '../blocklist/blocklist.ts'
import { UpdatePayload } from './update.payload.ts'
import { CreatePayload } from './create.payload.ts'

export interface BlocklistRepository {
  findAll(): Promise<Blocklist[]>
  create(payload: CreatePayload<Blocklist>): Promise<Blocklist>
  update(payload: UpdatePayload<Blocklist>): Promise<void>
  findById(blocklistId: string): Promise<Blocklist>
  delete(blocklistId: string): Promise<void>
}
