import { InstalledApp } from '../../../../core/installed-app/InstalledApp.ts'
import * as React from 'react'
import { FlatList } from 'react-native'
import { SelectableSirenCard } from '../SelectableSirenCard.tsx'

import { SirenType } from '../../../../core/siren/sirens.ts'

export function AppsSelectionScene(props: {
  data: InstalledApp[]
  toggleAppSiren: (
    sirenType: SirenType.ANDROID,
    app: Pick<InstalledApp, 'packageName' | 'appName' | 'icon'>,
  ) => void
  isSirenSelected: (sirenType: SirenType, sirenId: string) => boolean
}) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item) => item.packageName}
      renderItem={({ item }) => (
        <SelectableSirenCard
          sirenType={SirenType.ANDROID}
          siren={item}
          onPress={() => props.toggleAppSiren(SirenType.ANDROID, item)}
          isSelected={props.isSirenSelected(
            SirenType.ANDROID,
            item.packageName,
          )}
        />
      )}
    />
  )
}
