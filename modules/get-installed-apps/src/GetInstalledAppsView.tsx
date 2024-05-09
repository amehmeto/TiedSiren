import { requireNativeViewManager } from 'expo-modules-core'
import * as React from 'react'

import { GetInstalledAppsViewProps } from './GetInstalledApps.types'

const NativeView: React.ComponentType<GetInstalledAppsViewProps> =
  requireNativeViewManager('GetInstalledApps')

export default function GetInstalledAppsView(props: GetInstalledAppsViewProps) {
  return <NativeView {...props} />
}
