import { Device } from '../device.ts'

export interface RemoteDeviceRepository {
  findAll(): Promise<Device[]>
}
