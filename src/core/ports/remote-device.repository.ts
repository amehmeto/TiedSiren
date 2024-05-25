import { Device } from '../device/device.ts'

export interface RemoteDeviceRepository {
  findAll(): Promise<Device[]>
}
