import { SirensRepository } from '../core/siren/ports/sirens.repository.ts'
import { Sirens } from '../core/siren/sirens.ts'
import { faker } from '@faker-js/faker'
import { buildAndroidSiren } from '../core/_tests_/data-builders/android-siren.builder.ts'
import { undefined } from 'zod'

export class FakeDataSirensRepository implements SirensRepository {
  selectableSirens: Sirens = {
    android: [buildAndroidSiren(), buildAndroidSiren(), buildAndroidSiren()],
    ios: [],
    windows: [],
    macos: [],
    linux: [],
    websites: [
      faker.internet.domainName(),
      faker.internet.domainName(),
      faker.internet.domainName(),
      faker.internet.domainName(),
    ],
    keywords: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ],
  }

  addKeywordToSirens(keyword: string): Promise<void> {
    this.selectableSirens.keywords = [
      ...this.selectableSirens.keywords,
      keyword,
    ]
    return Promise.resolve()
  }

  getSelectableSirens(): Promise<Sirens> {
    return Promise.resolve(this.selectableSirens)
  }

  addWebsiteToSirens(website: string): Promise<void> {
    this.selectableSirens.websites = [
      ...this.selectableSirens.websites,
      website,
    ]
    return Promise.resolve()
  }
}
