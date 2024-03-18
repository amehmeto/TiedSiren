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
    totalBlocks: faker.number.int(),
    blocks: {
      apps: {
        android: [faker.internet.domainWord()],
      },
      websites: [faker.internet.domainName()],
      keywords: [faker.lorem.word()],
    },
  }
  return { ...randomBlocklist, ...wantedBlocklist }
}
