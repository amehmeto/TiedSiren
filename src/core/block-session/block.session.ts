import { Blocklist } from '../blocklist/blocklist.ts'
import { Device } from '../device/device.ts'
import { createEntityAdapter } from '@reduxjs/toolkit'

export type BlockSession = {
  id: string
  name: string
  blocklists: Blocklist[]
  devices: Device[]
  startedAt: string
  endedAt: string
  startNotificationId: string
  endNotificationId: string
}

export const blockSessionAdapter = createEntityAdapter<BlockSession>()
