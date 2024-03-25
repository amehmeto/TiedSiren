import { createEntityAdapter } from '@reduxjs/toolkit'

export type Sirens = {
  android: string[]
  windows: string[]
  macos: string[]
  ios: string[]
  linux: string[]
  websites: string[]
  keywords: string[]
}

export type Blocklist = {
  id: string
  name: string
  sirens: Sirens
}

export const blocklistAdapter = createEntityAdapter<Blocklist>()
