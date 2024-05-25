import { describe, it, beforeEach, expect } from 'vitest'
import { PouchdbRemoteDeviceRepository } from './pouchdb.remote-device.repository.ts'
import PouchDB from 'pouchdb'
import memoryAdapter from 'pouchdb-adapter-memory'

PouchDB.plugin(memoryAdapter)

describe('PouchDBRemoteDeviceRepository', () => {
  let deviceRepository: PouchdbRemoteDeviceRepository

  beforeEach(async () => {
    const db = new PouchDB('remote-devices')
    await db.destroy()

    deviceRepository = new PouchdbRemoteDeviceRepository()
  })

  it('should find all remote devices', async () => {
    const devices = await deviceRepository.findAll()
    expect(devices).toStrictEqual([])
  })
})
