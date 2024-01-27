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

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, TabScreens.HOME>
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const titleStyle = {
    fontWeight: 'bold' as const,
    color: 'white',
    fontFamily: 'Verdana',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  }

  const currentSessions: [string, number, number, number][] = [
    ['Sleeping time', 42, 2, 1],
    ['Working time', 34, 2, 4],
  ]

  return (
    <TiedSLinearBackground>
      <TiedSirenLogoSvg />
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        Good Afternoon
      </Text>
      <Text style={{ color: 'white' }}>Let's make it productive</Text>

      <Text style={titleStyle}>ACTIVE SESSIONS</Text>

      {currentSessions.map(([name, minutes, blocklists, devices]) => (
        <CurrentSessionBoard
          sessionName={name}
          minutesLeft={minutes}
          blocklists={blocklists}
          devices={devices}
        />
      ))}

      <Text style={titleStyle}>NO SCHEDULED SESSIONS</Text>

      <Text style={{ color: 'white' }}>
        Scheduled sessions start automatically and help you to stick to a plan,
        giving you distraction-free focus when you need it most
      </Text>

      <TiedSButton
        text={'CREATE A BLOCK SESSION'}
        onPress={() => navigation.navigate('CreateBlockSession')}
      />
    </TiedSLinearBackground>
  )
}
