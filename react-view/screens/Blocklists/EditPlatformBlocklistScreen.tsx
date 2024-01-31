import React, { useEffect, useState } from 'react'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { Image, Pressable, Text } from 'react-native'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { CheckBox } from 'react-native-elements'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { installedAppsRepository } from '../../dependencies'
import { InstalledApp } from '../../../core/installed-apps/InstalledApp'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

function AndroidSelectableAppCard(props: {
  app: InstalledApp
  onPress: () => any
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <Pressable onPress={props.onPress} style={{ padding: 0 }}>
      <TiedSBlurView style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{
            uri: 'data:image/png;base64,' + props.app.icon,
          }}
          style={{ marginRight: T.spacing.small, height: 20, width: 20 }}
        />
        <Text
          style={{ color: T.color.text, flexGrow: 1, alignItems: 'flex-end' }}
        >
          {props.app.appName}
        </Text>
        <CheckBox
          style={{ alignItems: 'flex-end' }}
          containerStyle={{ padding: 0, margin: 0 }}
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
      </TiedSBlurView>
    </Pressable>
  )
}

export function EditPlatformBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const titleStyle = {
    fontWeight: T.fontWeight.bold,
    color: T.color.text,
    fontFamily: T.fontFamily.primary,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  }

  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([])

  useEffect(() => {
    installedAppsRepository
      .getInstalledApps()
      .then((apps) => setInstalledApps(apps))
  }, [])

  return (
    <TiedSLinearBackground>
      <Text style={titleStyle}>Social communications</Text>

      {installedApps.map((app) => (
        <AndroidSelectableAppCard
          key={app.packageName}
          app={app}
          onPress={() => {}}
        />
      ))}
      <TiedSButton onPress={() => {}} text={'SAVE APPS INTO BLOCKLIST'} />
    </TiedSLinearBackground>
  )
}
