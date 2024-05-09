import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from 'expo-modules-core'

// Import the native module. On web, it will be resolved to GetInstalledApps.web.ts
// and on native platforms to GetInstalledApps.ts
import GetInstalledAppsModule from './src/GetInstalledAppsModule'
import GetInstalledAppsView from './src/GetInstalledAppsView'
import {
  ChangeEventPayload,
  GetInstalledAppsViewProps,
} from './src/GetInstalledApps.types'

// Get the native constant value.
export const PI = GetInstalledAppsModule.PI

export function hello(): string {
  return GetInstalledAppsModule.hello()
}

export async function setValueAsync(value: string) {
  return await GetInstalledAppsModule.setValueAsync(value)
}

const emitter = new EventEmitter(
  GetInstalledAppsModule ?? NativeModulesProxy.GetInstalledApps,
)

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export { GetInstalledAppsView, GetInstalledAppsViewProps, ChangeEventPayload }
