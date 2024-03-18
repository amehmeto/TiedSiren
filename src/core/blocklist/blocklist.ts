import { createEntityAdapter } from '@reduxjs/toolkit'

export type Blocklist = {
  id: string
  name: string
  totalBlocks?: number
  blocks: {
    apps: {
      android: string[]
      windows?: string[]
      macos?: string[]
      ios?: string[]
      linux?: string[]
    }
    websites: string[]
    keywords: string[]
  }
}

export const blocklistAdapter = createEntityAdapter<Blocklist>()
