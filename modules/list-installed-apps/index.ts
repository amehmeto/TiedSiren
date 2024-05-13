import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from 'expo-modules-core'

// Import the native module. On web, it will be resolved to ListInstalledApps.web.ts
// and on native platforms to ListInstalledApps.ts
import ListInstalledAppsModule from './src/ListInstalledAppsModule'
import ListInstalledAppsView from './src/ListInstalledAppsView'

export function hello(): string {
  return ListInstalledAppsModule.hello()
}

export function listInstalledApps(): Array<any> {
  return ListInstalledAppsModule.listInstalledApps()
}

export { ListInstalledAppsView }
