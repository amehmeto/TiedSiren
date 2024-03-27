import { Sirens } from '../../siren/sirens.ts'

export function buildSirens(wantedSirens: Partial<Sirens> = {}): Sirens {
  return {
    android: [],
    ios: [],
    linux: [],
    macos: [],
    windows: [],
    websites: [],
    keywords: [],
    ...wantedSirens,
  }
}
