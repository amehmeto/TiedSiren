import { SirensRepository } from '../core/siren/ports/sirens.repository.ts'
import { Sirens } from '../core/siren/sirens.ts'
import { faker } from '@faker-js/faker'
import { buildAndroidSiren } from '../core/_tests_/data-builders/android-siren.builder.ts'

export class FakeDataSirensRepository implements SirensRepository {
  sirens: Sirens = {
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
      faker.lorem.words(),
      faker.lorem.words(),
      faker.lorem.words(),
      faker.lorem.words(),
    ],
  }
  getAvailableSirens(): Promise<Sirens> {
    console.log('WESH')
    return Promise.resolve(this.sirens)
  }
}
