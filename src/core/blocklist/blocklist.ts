import { createEntityAdapter } from '@reduxjs/toolkit'

export type Blocks = {
  apps: {
    android: string[]
    windows: string[]
    macos: string[]
    ios: string[]
    linux: string[]
  }
  websites: string[]
  keywords: string[]
}

export type Blocklist = {
  id: string
  name: string
  blocks: Blocks
}

export const blocklistAdapter = createEntityAdapter<Blocklist>()
