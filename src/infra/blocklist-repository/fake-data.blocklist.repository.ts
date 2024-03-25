import { BlocklistRepository } from '../../core/blocklist/ports/blocklist.repository.ts'
import { Blocklist } from '../../core/blocklist/blocklist.ts'

export class FakeDataBlocklistRepository implements BlocklistRepository {
  blocklists: Map<string, Blocklist> = new Map()

  getBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve([
      {
        id: 'blocklist-id-1',
        name: 'Distractions',
        sirens: {
          android: ['Instagram', 'Facebook'],
          ios: [],
          linux: [],
          macos: [],
          windows: [],
          websites: ['twitter.com'],
          keywords: ['cat videos'],
        },
      },
      {
        id: 'blocklist-id-2',
        name: 'Necessary evils',
        sirens: {
          android: ['WhatsApp'],
          ios: [],
          linux: [],
          macos: [],
          windows: [],
          keywords: ['work'],
          websites: ['linkedin.com'],
        },
      },
      {
        id: 'blocklist-id-3',
        name: 'Productivity',
        sirens: {
          android: ['Todoist', 'Trello'],
          ios: [],
          linux: [],
          macos: [],
          windows: [],
          websites: ['github.com'],
          keywords: ['productivity'],
        },
      },
    ])
  }

  createBlocklist(payload: Omit<Blocklist, 'id'>): Promise<Blocklist> {
    const blocklistId = String(Math.random() * 100)
    this.blocklists.set(blocklistId, { id: blocklistId, ...payload })
    const createdBlocklist = this.blocklists.get(blocklistId)
    if (!createdBlocklist) throw new Error('Blocklist not found')
    return Promise.resolve(createdBlocklist)
  }
}
