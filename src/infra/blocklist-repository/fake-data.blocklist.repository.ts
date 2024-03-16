import { BlocklistRepository } from '../../core/blocklist/ports/blocklist.repository.ts'
import { Blocklist } from '../../core/blocklist/blocklist.ts'

export class FakeDataBlocklistRepository implements BlocklistRepository {
  getBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve([
      { id: 'blocklist-id-1', name: 'Distractions', totalBlocks: 23 },
      { id: 'blocklist-id-2', name: 'Necessary evils', totalBlocks: 4 },
      { id: 'blocklist-id-3', name: 'Productivity', totalBlocks: 12 },
    ])
  }
}
