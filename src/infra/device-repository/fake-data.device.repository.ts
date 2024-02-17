import { Device } from '../../core/device/device.ts'
import { DeviceRepository } from '../../core/device/ports/device.repository.ts'

export class FakeDataDeviceRepository implements DeviceRepository {
  async getDevices(): Promise<Device[]> {
    return [
      { id: '1', type: 'phone', name: 'iPhone 12' },
      { id: '2', type: 'tablet', name: 'iPad Pro' },
      { id: '3', type: 'laptop', name: 'MacBook Pro' },
    ]
  }
}