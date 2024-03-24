import { Blocklist } from '../blocklist.ts'

export interface SirenTier {
  block(aggregatedActiveBlocklist: Blocklist): Promise<void>
}
