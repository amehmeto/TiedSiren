import { describe, it, beforeEach, expect } from 'vitest'
import { buildBlocklist } from '../../core/_tests_/data-builders/blocklist.builder.ts'
import { Blocklist } from '../../core/blocklist/blocklist.ts'
import { CreatePayload } from '../generic-in-memory.repository.ts'
import { PouchdbBlocklistRepository } from './pouchdb.blocklist.repository.ts'
import PouchDB from 'pouchdb'
import memoryAdapter from 'pouchdb-adapter-memory'

PouchDB.plugin(memoryAdapter)

describe('PouchDBBlocklistRepository', () => {
  let blocklistRepository: PouchdbBlocklistRepository

  beforeEach(() => {
    blocklistRepository = new PouchdbBlocklistRepository()
  })

  it('should create a blocklist', async () => {
    const blocklistPayload: CreatePayload<Blocklist> = buildBlocklist()

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete blocklistPayload.id

    const createdBlocklist = await blocklistRepository.create(blocklistPayload)

    expect(createdBlocklist).toStrictEqual({
      id: expect.any(String),
      ...blocklistPayload,
    })
  })

  /*
  it('should find a blocklist by id', async () => {
    const blocklistPayload: CreatePayload<Blocklist> = buildBlocklist()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete blocklistPayload.id

    const createdBlocklist = await blocklistRepository.create(blocklistPayload)

    const foundBlocklist = await blocklistRepository.findById(
      createdBlocklist.id,
    )
    expect(foundBlocklist).toStrictEqual(createdBlocklist)
  })

  it('should find all current blocklists', async () => {
    const createBlocklistPayload: CreatePayload<Blocklist> = buildBlocklist()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete createBlocklistPayload.id

    await blocklistRepository.create(createBlocklistPayload)

    const createBlocklistPayload2: CreatePayload<Blocklist> = buildBlocklist()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete createBlocklistPayload2.id

    await blocklistRepository.create(createBlocklistPayload2)

    const currentBlocklists = await blocklistRepository.getCurrentBlocklists()

    expect(currentBlocklists).toStrictEqual([])
  })*/
})
