import { Blocklist } from '../blocklist.ts'

export interface BlocklistRepository {
  getBlocklists(): Promise<Blocklist[]>
  createBlocklist(
    payload: Omit<Blocklist, 'id' | 'totalBlocks'>,
  ): Promise<Blocklist>
  updateBlocklist(payload: Partial<Blocklist>): Promise<void>
}
