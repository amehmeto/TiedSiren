import { Sirens } from '../blocklist.ts'

export interface SirenTier {
  tie(sirens: Sirens): Promise<void>
}
