import React from 'react'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { Image, Pressable, Text, View } from 'react-native'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { CheckBox } from 'react-native-elements'
import uuid from 'react-native-uuid'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

function AndroidSelectableAppCard(props: {
  appName: string
  onPress: () => any
}) {
  return (
    <Pressable onPress={props.onPress}>
      <TiedSBlurView style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('../../../assets/YoutubeAppIcon.png')}
          style={{ marginRight: T.spacing.small, height: 20, width: 20 }}
        />
        <Text style={{ color: T.color.text, flexGrow: 1 }}>
          {props.appName}
        </Text>
        <CheckBox style={{ alignItems: 'flex-end' }} />
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

  const apps = [
    {
      id: String(uuid.v4()),
      name: 'YouTube',
    },
    {
      id: String(uuid.v4()),
      name: 'Amazon Prime',
    },
    {
      id: String(uuid.v4()),
      name: 'TikTok',
    },
  ]

  return (
    <TiedSLinearBackground>
      <Text style={titleStyle}>Social communications</Text>

      {apps.map(({ id, name }) => (
        <AndroidSelectableAppCard key={id} appName={name} onPress={() => {}} />
      ))}
    </TiedSLinearBackground>
  )
}
