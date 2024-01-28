import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { BottomTabList } from '../../../App'
import { TiedSirenLogoSvg } from './TiedSirenLogoSvg'
import 'react-native-gesture-handler'
import { TabScreens } from '../../navigators/BottomTabNavigator'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { CurrentSessionBoard } from './CurrentSessionBoard'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { T } from '../../design-system/theme'
import { HomeStackScreens } from '../../navigators/HomeStackNavigator'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, TabScreens.HOME>
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

  const currentSessions: [string, number, number, number][] = [
    ['Sleeping time', 42, 2, 1],
    ['Working time', 34, 2, 4],
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

      {currentSessions.map(([name, minutes, blocklists, devices]) => (
        <CurrentSessionBoard
          key={name}
          sessionName={name}
          minutesLeft={minutes}
          blocklists={blocklists}
          devices={devices}
        />
      ))}

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
