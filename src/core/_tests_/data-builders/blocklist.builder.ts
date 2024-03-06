import { faker } from '@faker-js/faker'

export function buildBlocklist(blocklist = {}) {
  const blocklistNameExamples = [
    'Distractions',
    'Necessary evils',
    'games',
    'social medias',
  ]

  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(blocklistNameExamples),
    totalBlocks: faker.number.int(),
  }
}
