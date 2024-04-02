import uuid from 'react-native-uuid'

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

  async create(payload: Omit<T, 'id'>): Promise<T> {
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
  }
}
