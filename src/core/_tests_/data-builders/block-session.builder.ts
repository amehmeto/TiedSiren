import { faker } from '@faker-js/faker'
import { BlockSession } from '../../block-session/block.session.ts'
import { buildBlocklist } from './blocklist.builder.ts'
import { buildDevice } from './device.builder.ts'

export const buildBlockSession = (blockSession = {}): BlockSession => {
  const sessionNameExamples = [
    'Sleeping time',
    'Working time',
    'Meditation time',
  ]

  const defaultBlockSession = {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(sessionNameExamples),
    start: '03:48:00',
    end: '13:58:00',
    blocklists: [buildBlocklist()],
    devices: [buildDevice(), buildDevice()],
  }
  return { ...defaultBlockSession, ...blockSession }
}
