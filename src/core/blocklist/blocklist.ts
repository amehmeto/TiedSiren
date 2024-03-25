import { createEntityAdapter } from '@reduxjs/toolkit'

export enum SirenType {
  WEBSITES = 'websites',
  KEYWORDS = 'keywords',
  ANDROID = 'android',
  WINDOWS = 'windows',
  MACOS = 'macos',
  IOS = 'ios',
  LINUX = 'linux',
}

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
