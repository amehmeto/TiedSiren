import { Blocklist } from '../blocklist.ts'

export interface BlocklistRepository {
  getBlocklists(): Promise<Blocklist[]>
}
