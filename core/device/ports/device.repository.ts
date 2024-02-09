import { Device } from '../device'

export interface DeviceRepository {
  getDevices(): Promise<Device[]>
}
