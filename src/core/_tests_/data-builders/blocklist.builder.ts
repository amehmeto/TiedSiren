import { faker } from '@faker-js/faker'
import { Blocklist } from '../../blocklist/blocklist.ts'

export function buildBlocklist(
  wantedBlocklist: Partial<Blocklist> = {},
): Blocklist {
  const blocklistNameExamples = [
    'Distractions',
    'Necessary evils',
    'games',
    'social medias',
  ]

  const randomBlocklist: Blocklist = {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(blocklistNameExamples),
    blocks: {
      apps: {
        android: [faker.internet.domainWord()],
        ios: [],
        linux: [],
        macos: [],
        windows: [],
      },
      websites: [faker.internet.domainName()],
      keywords: [faker.lorem.word()],
    },
  }
  return { ...randomBlocklist, ...wantedBlocklist }
}
