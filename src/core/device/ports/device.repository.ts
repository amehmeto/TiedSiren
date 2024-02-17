import { Device } from '../device.ts'

export interface DeviceRepository {
  getDevices(): Promise<Device[]>
}
