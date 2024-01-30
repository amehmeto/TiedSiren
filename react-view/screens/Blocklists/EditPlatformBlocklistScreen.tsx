import React, { useEffect, useState } from 'react'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { Image, Platform, Pressable, Text } from 'react-native'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { CheckBox } from 'react-native-elements'
import RNInstalledApplication from 'react-native-installed-application'
import {
  AmazonPrimeIcon,
  TikTokAppIcon,
  YouTubeAppIcon,
} from '../../../assets/fakeBase64AppIcons'
import { TiedSButton } from '../../design-system/components/TiedSButton'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export type InstalledApplication = {
  packageName: string
  versionName: string
  versionCode: number
  firstInstallTime: number
  lastUpdateTime: number
  appName: string
  icon: string // Base64 encoded image
  apkDir: string
  size: number // Size in bytes
}

function AndroidSelectableAppCard(props: {
  app: InstalledApplication
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

  const fakeInstalledApps: InstalledApplication[] = [
    {
      packageName: 'com.example.youtube',
      versionName: '1.0.0',
      versionCode: 1,
      firstInstallTime: 1616161616161,
      lastUpdateTime: 1626262626262,
      appName: 'YouTube',
      icon: YouTubeAppIcon,
      apkDir: '/data/app/youtube-1/base.apk',
      size: 52428800,
    },
    {
      packageName: 'com.example.amazonprime',
      versionName: '1.0.0',
      versionCode: 1,
      firstInstallTime: 1616161616161,
      lastUpdateTime: 1626262626262,
      appName: 'Amazon Prime',
      icon: AmazonPrimeIcon,
      apkDir: '/data/app/amazonprime-1/base.apk',
      size: 52428800,
    },
    {
      packageName: 'com.example.tiktok',
      versionName: '1.0.0',
      versionCode: 1,
      firstInstallTime: 1616161616161,
      lastUpdateTime: 1626262626262,
      appName: 'TikTok',
      icon: TikTokAppIcon,
      apkDir: '/data/app/tiktok-1/base.apk',
      size: 52428800,
    },
  ]

  const [installedApps, setInstalledApps] =
    useState<InstalledApplication[]>(fakeInstalledApps)

  useEffect(() => {
    if (Platform.OS === 'android')
      RNInstalledApplication.getApps().then((apps: InstalledApplication[]) =>
        setInstalledApps(apps),
      )
  })

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
