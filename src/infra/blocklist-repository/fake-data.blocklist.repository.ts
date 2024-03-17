import { BlocklistRepository } from '../../core/blocklist/ports/blocklist.repository.ts'
import { Blocklist } from '../../core/blocklist/blocklist.ts'

export class FakeDataBlocklistRepository implements BlocklistRepository {
  blocklists: Map<string, Blocklist> = new Map()

  getBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve([
      {
        id: 'blocklist-id-1',
        name: 'Distractions',
        totalBlocks: 23,
        blocks: {
          apps: {
            android: ['Instagram', 'Facebook'],
          },
          websites: ['twitter.com'],
          keywords: ['cat videos'],
        },
      },
      {
        id: 'blocklist-id-2',
        name: 'Necessary evils',
        totalBlocks: 4,
        blocks: {
          apps: { android: ['WhatsApp'] },
          keywords: ['work'],
          websites: ['linkedin.com'],
        },
      },
      {
        id: 'blocklist-id-3',
        name: 'Productivity',
        totalBlocks: 12,
        blocks: {
          apps: { android: ['Todoist', 'Trello'] },
          websites: ['github.com'],
          keywords: ['productivity'],
        },
      },
    ])
  }

  createBlocklist(
    payload: Omit<Blocklist, 'id' | 'totalBlocks'>,
  ): Promise<Blocklist> {
    const blocklistId = String(Math.random() * 100)
    this.blocklists.set(blocklistId, { id: blocklistId, ...payload })
    const createdBlocklist = this.blocklists.get(blocklistId)
    if (!createdBlocklist) throw new Error('Blocklist not found')
    return Promise.resolve(createdBlocklist)
  }
}
