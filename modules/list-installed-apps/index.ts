import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from 'expo-modules-core'

// Import the native module. On web, it will be resolved to ListInstalledApps.web.ts
// and on native platforms to ListInstalledApps.ts
import ListInstalledAppsModule from './src/ListInstalledAppsModule'
import ListInstalledAppsView from './src/ListInstalledAppsView'
import {
  ChangeEventPayload,
  ListInstalledAppsViewProps,
} from './src/ListInstalledApps.types'

// Get the native constant value.
export const PI = ListInstalledAppsModule.PI

export function hello(): string {
  return ListInstalledAppsModule.hello()
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export function getInstalledApps(): Array {
  return ListInstalledAppsModule.getInstalledApps()
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export { ListInstalledAppsView, ListInstalledAppsViewProps, ChangeEventPayload }
