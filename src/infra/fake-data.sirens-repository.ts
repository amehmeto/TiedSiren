import { SirensRepository } from '../core/siren/ports/sirens.repository.ts'
import { Sirens } from '../core/siren/sirens.ts'

export class FakeDataSirensRepository implements SirensRepository {
  sirens: Sirens = {
    android: ['com.whatsapp', 'com.facebook', 'com.instagram'],
    ios: [],
    windows: [],
    macos: [],
    linux: [],
    websites: [
      'https://www.whatsapp.com',
      'https://www.facebook.com',
      'https://www.instagram.com',
    ],
    keywords: ['football', 'soccer', 'basketball'],
  }
  getAvailableSirens(): Promise<Sirens> {
    return Promise.resolve(this.sirens)
  }
}
