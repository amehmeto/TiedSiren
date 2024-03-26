import { Sirens } from '../sirens.ts'

export interface SirensRepository {
  getAvailableSirens(): Promise<Sirens>
}
