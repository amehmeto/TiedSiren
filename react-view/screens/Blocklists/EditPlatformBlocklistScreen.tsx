import React, { useEffect, useState } from 'react'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { FlatList, StyleSheet, Text } from 'react-native'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { installedAppsRepository } from '../../dependencies'
import { AndroidSelectableAppCard } from './AndroidSelectableAppCard'
import { InstalledApp } from '../../../core/installed-app/InstalledApp'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function EditPlatformBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([])

  useEffect(() => {
    installedAppsRepository
      .getInstalledApps()
      .then((apps) => setInstalledApps(apps))
  }, [])

  return (
    <TiedSLinearBackground>
      <Text style={styles.title}>Social communications</Text>

      <FlatList
        data={installedApps}
        keyExtractor={(item) => item.packageName}
        renderItem={({ item }) => (
          <AndroidSelectableAppCard app={item} onPress={() => {}} />
        )}
      />

      <TiedSButton onPress={() => {}} text={'SAVE APPS INTO BLOCKLIST'} />
    </TiedSLinearBackground>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: T.fontWeight.bold,
    color: T.color.text,
    fontFamily: T.fontFamily.primary,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  },
})
