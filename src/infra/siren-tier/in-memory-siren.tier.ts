import { SirenTier } from '../../core/blocklist/ports/sirenTier.ts'
import { Sirens } from '../../core/siren/sirens.ts'

export class InMemorySirenTier implements SirenTier {
  sirens?: Sirens = undefined

  async tie(sirens: Sirens): Promise<void> {
    console.log(
      'Tied sirens:',
      sirens.android.map((app) => app.appName),
    )
    this.sirens = sirens
  }
}
