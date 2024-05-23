import uuid from 'react-native-uuid'

export type UpdatePayload<T extends { id: string }> = Partial<T> &
  Required<Pick<T, 'id'>>

export type CreatePayload<T extends { id: string }> = Omit<T, 'id'>

export class GenericInMemoryRepository<T extends { id: string }> {
  entities: Map<string, T> = new Map()

  async findById(id: string): Promise<T> {
    const entities = this.entities.get(id)
    if (!entities)
      throw new Error(`Entity not found in InMemoryRepository for ${id}`)
    return entities
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.entities.values())
  }

  async save(entity: T): Promise<void> {
    this.entities.set(String(uuid.v4()), entity)
  }

  async create(payload: CreatePayload<T>): Promise<T> {
    const toBeCreatedEntity: T = { id: uuid.v4().toString(), ...payload } as T
    this.entities.set(toBeCreatedEntity.id, toBeCreatedEntity)
    const createdEntity = this.entities.get(toBeCreatedEntity.id)
    if (!createdEntity)
      throw new Error(
        `Entity not created inside InMemory  ${toBeCreatedEntity.id}`,
      )
    return Promise.resolve(createdEntity)
  }

  async delete(id: string): Promise<void> {
    this.entities.delete(id)
    return Promise.resolve()
  }

  update(updatePayload: UpdatePayload<T>) {
    const entity = this.entities.get(updatePayload.id)
    if (!entity)
      throw new Error('Entity not found and not updated inside InMemory')
    this.entities.set(updatePayload.id, { ...entity, ...updatePayload })
    return Promise.resolve()
  }
}
