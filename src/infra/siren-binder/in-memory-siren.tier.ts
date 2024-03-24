import { Blocklist } from '../../core/blocklist/blocklist.ts'
import { SirenTier } from '../../core/blocklist/ports/sirenTier.ts'

export class InMemorySirenTier implements SirenTier {
  tiedSirens?: Blocklist = undefined

  async block(aggregatedActiveBlocklist: Blocklist): Promise<void> {
    this.tiedSirens = aggregatedActiveBlocklist
    console.log('Blocking sirens: ', this.tiedSirens)
  }
}
