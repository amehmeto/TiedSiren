import * as React from 'react'

import { GetInstalledAppsViewProps } from './GetInstalledApps.types'

export default function GetInstalledAppsView(props: GetInstalledAppsViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  )
}
