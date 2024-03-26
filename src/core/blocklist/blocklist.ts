import { createEntityAdapter } from '@reduxjs/toolkit'
import { Sirens } from '../siren/sirens.ts'

export type Blocklist = {
  id: string
  name: string
  sirens: Sirens
}

export const blocklistAdapter = createEntityAdapter<Blocklist>()
