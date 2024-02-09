import { Blocklist } from '../blocklist'

export interface BlocklistRepository {
  getBlocklists(): Promise<Blocklist[]>
}
