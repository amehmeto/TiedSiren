import { Sirens } from '../sirens.ts'

export interface SirensRepository {
  getSelectableSirens(): Promise<Sirens>
  addKeywordToSirens(keyword: string): Promise<void>
  addWebsiteToSirens(website: string): Promise<void>
}
