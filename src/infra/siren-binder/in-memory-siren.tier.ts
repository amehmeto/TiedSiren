import { SirenTier } from '../../core/blocklist/ports/sirenTier.ts'
import { Sirens } from '../../core/siren/sirens.ts'

export class InMemorySirenTier implements SirenTier {
  sirens?: Sirens = undefined

  async tie(sirens: Sirens): Promise<void> {
    console.log('Blocking sirens: ', this.sirens)
    this.sirens = sirens
  }
}
