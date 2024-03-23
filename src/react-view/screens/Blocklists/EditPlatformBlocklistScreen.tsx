import { useEffect, useState } from 'react'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { FlatList, StyleSheet, Text } from 'react-native'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { installedAppsRepository } from '../../dependencies'
import { SelectableSirenCard } from './SelectableSirenCard.tsx'
import { InstalledApp } from '../../../core/installed-app/InstalledApp'
import { BlocklistsStackScreens } from '../../navigators/screen-lists/BlocklistsStackScreens'
import { SirenType } from './CreateBlocklistScreen/CreateBlocklistScreen.tsx'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<
    ScreenList,
    BlocklistsStackScreens.MAIN_BLOCKLIST
  >
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
          <SelectableSirenCard
            sirenType={SirenType.APP}
            siren={item}
            onPress={() => {}}
            isSelected={false}
          />
        )}
      />

      <TiedSButton
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.MAIN_BLOCKLIST)
        }
        text={'SAVE APPS INTO BLOCKLIST'}
      />
    </TiedSLinearBackground>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: T.font.weight.bold,
    color: T.color.text,
    fontFamily: T.font.family.primary,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  },
})
