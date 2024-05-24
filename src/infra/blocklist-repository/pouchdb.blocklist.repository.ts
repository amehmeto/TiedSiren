import { BlocklistRepository } from '../../core/blocklist/ports/blocklist.repository.ts'
import {
  CreatePayload,
  UpdatePayload,
} from '../generic-in-memory.repository.ts'
import { Blocklist } from '../../core/blocklist/blocklist.ts'
import uuid from 'react-native-uuid'
import PouchDB from 'pouchdb'

export class PouchdbBlocklistRepository implements BlocklistRepository {
  private db: PouchDB.Database<Blocklist>

  constructor() {
    this.db = new PouchDB('blocklists')
  }
  getCurrentBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve([])
  }

  async create(blocklistPayload: CreatePayload<Blocklist>): Promise<Blocklist> {
    const createdId = uuid.v4().toString()
    const createdBlocklist = {
      ...blocklistPayload,
      _id: createdId,
      id: createdId,
    }

    await this.db.put(createdBlocklist).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
    console.log('blocklist created inside Pouchdb')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...blocklistWithoutInternalId } = createdBlocklist
    return Promise.resolve(blocklistWithoutInternalId)
  }

  async delete(blocklistId: string): Promise<void> {
    await this.db.get(blocklistId).then(async (doc) => {
      await this.db.remove(doc._id, doc._rev)
    })
  }

  async findById(blocklistId: string): Promise<Blocklist> {
    const retrievedBlocklist = await this.db.get(blocklistId)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, _rev, ...blocklistWithoutInternalIds } = retrievedBlocklist
    return Promise.resolve(blocklistWithoutInternalIds)
  }

  async update(updateBlocklist: UpdatePayload<Blocklist>): Promise<void> {
    await this.db.get(updateBlocklist.id).then(async (doc) => {
      await this.db.put({
        ...doc,
        ...updateBlocklist,
        _id: updateBlocklist.id,
        _rev: doc._rev,
      })
    })
  }

  createBlocklist(payload: Omit<Blocklist, 'id'>): Promise<Blocklist> {
    throw new Error('Method not implemented.')
    // return Promise.resolve(undefined)
  }

  deleteBlocklist(blocklistId: string): Promise<void> {
    return Promise.resolve(undefined)
  }

  getBlocklists(): Promise<Blocklist[]> {
    return Promise.resolve([])
  }

  updateBlocklist(
    payload: Partial<Blocklist> & Required<Pick<Blocklist, 'id'>>,
  ): Promise<void> {
    return Promise.resolve(undefined)
  }
}
