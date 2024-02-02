import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { FlatList, Text } from 'react-native'
import { TiedSirenLogoSvg } from './TiedSirenLogoSvg'
import 'react-native-gesture-handler'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { CurrentSessionBoard } from './CurrentSessionBoard'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { T } from '../../design-system/theme'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { HomeStackScreens } from '../../navigators/screen-lists/HomeStackScreens'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const titleStyle = {
    fontWeight: T.fontWeight.bold,
    color: T.color.text,
    fontFamily: T.fontFamily.primary,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  }

  const currentSessions = [
    { name: 'Sleeping time', minutesLeft: 22, blocklists: 2, devices: 1 },
    { name: 'Working time', minutesLeft: 34, blocklists: 2, devices: 4 },
  ]

  return (
    <TiedSLinearBackground>
      <TiedSirenLogoSvg />
      <Text
        style={{
          color: T.color.text,
          fontWeight: T.fontWeight.bold,
          fontSize: T.size.medium,
        }}
      >
        Good Afternoon
      </Text>
      <Text style={{ color: T.color.text }}>Let's make it productive</Text>

      <Text style={titleStyle}>ACTIVE SESSIONS</Text>

      <FlatList
        data={currentSessions}
        renderItem={({ item }) => <CurrentSessionBoard session={item} />}
      />

      <Text style={titleStyle}>NO SCHEDULED SESSIONS</Text>

      <Text style={{ color: T.color.text }}>
        Scheduled sessions start automatically and help you to stick to a plan,
        giving you distraction-free focus when you need it most
      </Text>

      <TiedSButton
        text={'CREATE A BLOCK SESSION'}
        onPress={() =>
          navigation.navigate(HomeStackScreens.CREATE_BLOCK_SESSION)
        }
      />
    </TiedSLinearBackground>
  )
}
