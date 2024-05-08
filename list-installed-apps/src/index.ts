import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from 'expo-modules-core'

// Import the native module. On web, it will be resolved to ListInstalledApps.web.ts
// and on native platforms to ListInstalledApps.ts
import {
  ChangeEventPayload,
  ListInstalledAppsViewProps,
} from './ListInstalledApps.types'
import ListInstalledAppsModule from './ListInstalledAppsModule'
import ListInstalledAppsView from './ListInstalledAppsView'

// Get the native constant value.
export const PI = ListInstalledAppsModule.PI

export function hello(): string {
  return ListInstalledAppsModule.hello()
}

export async function setValueAsync(value: string) {
  return await ListInstalledAppsModule.setValueAsync(value)
}

const emitter = new EventEmitter(
  ListInstalledAppsModule ?? NativeModulesProxy.ListInstalledApps,
)

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener)
}

// @ts-ignore
export { ListInstalledAppsView, ListInstalledAppsViewProps, ChangeEventPayload }
