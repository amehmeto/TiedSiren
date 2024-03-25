import { InstalledApp } from '../../../../core/installed-app/InstalledApp.ts'
import * as React from 'react'
import { FlatList } from 'react-native'
import { SelectableSirenCard } from '../SelectableSirenCard.tsx'
import { SirenType } from '../../../../core/blocklist/blocklist.ts'

export function AppsSelectionScene(props: {
  data: InstalledApp[]
  toggleSiren: (sirenType: SirenType, sirenId: string) => void
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
          onPress={() => props.toggleSiren(SirenType.ANDROID, item.packageName)}
          isSelected={props.isSirenSelected(
            SirenType.ANDROID,
            item.packageName,
          )}
        />
      )}
    />
  )
}
