import { BlocklistRepository } from '../../core/blocklist/ports/blocklist.repository.ts'
import { Blocklist } from '../../core/blocklist/blocklist.ts'
import {
  amazonPrimeAndroidSiren,
  facebookAndroidSiren,
  instagramAndroidSiren,
  whatsappAndroidSiren,
  youtubeAndroidSiren,
} from '../../core/_tests_/data-builders/android-siren.builder.ts'

export class FakeDataBlocklistRepository implements BlocklistRepository {
  blocklists: Map<string, Blocklist> = new Map(
    [
      {
        id: 'blocklist-id-1',
        name: 'Social medias',
        sirens: {
          android: [instagramAndroidSiren, facebookAndroidSiren],
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
          android: [whatsappAndroidSiren],
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
        name: 'Streaming services',
        sirens: {
          android: [youtubeAndroidSiren, amazonPrimeAndroidSiren],
          ios: [],
          linux: [],
          macos: [],
          windows: [],
          websites: ['hulu.com'],
          keywords: ['movies', 'series'],
        },
      },
    ].map((blocklist) => [blocklist.id, blocklist]),
  )

  getBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve(Array.from(this.blocklists.values()))
  }

  createBlocklist(payload: Omit<Blocklist, 'id'>): Promise<Blocklist> {
    const blocklistId = String(Math.random() * 100)
    this.blocklists.set(blocklistId, { id: blocklistId, ...payload })
    const createdBlocklist = this.blocklists.get(blocklistId)
    if (!createdBlocklist) throw new Error('Blocklist not found')
    return Promise.resolve(createdBlocklist)
  }
}
