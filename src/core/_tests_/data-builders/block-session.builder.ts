import { faker } from '@faker-js/faker'
import { BlockSession } from '../../block-session/block.session.ts'
import { buildBlocklist } from './blocklist.builder.ts'
import { buildDevice } from './device.builder.ts'

export const buildBlockSession = (
  wantedBlockSession: Partial<BlockSession> = {},
): BlockSession => {
  const sessionNameExamples = [
    'Sleeping time',
    'Working time',
    'Meditation time',
  ]

  const defaultBlockSession = {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(sessionNameExamples),
    startedAt: '03:48',
    endedAt: '13:58',
    blocklists: [buildBlocklist()],
    devices: [buildDevice(), buildDevice()],
  }
  return { ...defaultBlockSession, ...wantedBlockSession }
}
