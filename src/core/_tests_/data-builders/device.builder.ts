import { Device } from '../../device/device.ts'
import { faker } from '@faker-js/faker'

export function buildDevice(device = {}): Device {
  const deviceTypes = ['android', 'ios', 'web', 'masOS', 'windows']
  const deviceNames = ['Huawei P30', 'Google Pixel 3a', 'MacBook Pro 2018']

  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(deviceTypes),
    name: faker.helpers.arrayElement(deviceNames),
  }
}
