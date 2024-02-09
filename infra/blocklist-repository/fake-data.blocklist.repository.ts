import { BlocklistRepository } from '../../core/blocklist/ports/blocklist.repository'
import { Blocklist } from '../../core/blocklist/blocklist'
import uuid from 'react-native-uuid'

export class FakeDataBlocklistRepository implements BlocklistRepository {
  getBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve([
      { id: String(uuid.v4()), name: 'Distractions', totalBlocks: 23 },
      { id: String(uuid.v4()), name: 'Necessary evils', totalBlocks: 4 },
      { id: String(uuid.v4()), name: 'Productivity', totalBlocks: 12 },
    ])
  }
}
