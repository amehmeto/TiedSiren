import { Sirens } from '../siren/sirens.ts'

export interface SirenTier {
  tie(sirens: Sirens): Promise<void>
}
