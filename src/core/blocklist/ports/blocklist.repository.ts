import { Blocklist } from '../blocklist.ts'

export interface BlocklistRepository {
  getBlocklists(): Promise<Blocklist[]>
  createBlocklist(payload: Omit<Blocklist, 'id'>): Promise<Blocklist>
  updateBlocklist(payload: Partial<Blocklist>): Promise<void>
  findById(blocklistId: string): Promise<Blocklist>
  deleteBlocklist(blocklistId: string): Promise<void>
}
