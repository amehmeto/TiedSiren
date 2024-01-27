import { Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TabScreens } from '../navigators/BottomTabNavigator'
import { TiedSButton } from '../design-system/components/TiedSButton'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'

const BlockSessionParamStyle = {
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 10,
  paddingRight: 10,
}

const BlockSessionBoardStyle = {
  padding: 15,
  marginTop: 10,
  marginBottom: 10,
  borderRadius: 5,
  shadowColor: '#1e1e1e',
  shadowOffset: {
    width: 5,
    height: 5,
  },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 20, // for Android
}

type Props = {
  label: string
  option: string
}

function BlockSessionParam({ label, option }: Props) {
  const labelStyle = { color: 'white' }
  const optionStyle = { color: 'rgba(0,212,255,1)' }

  return (
    <View style={BlockSessionParamStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={optionStyle}>{option}</Text>
    </View>
  )
}

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, TabScreens.HOME>
}

export function CreateBlockSessionScreen({
  navigation,
}: Readonly<HomeScreenProps>) {
  const BlocklistParams = [
    ['Blocklists', 'Distractions'],
    ['Devices', 'Huawei P20, Lenovo Tab'],
    ['Starts', '19:00'],
    ['Ends', '21:00'],
    ['Session Name', 'Working time'],
  ]

  return (
    <TiedSLinearBackground>
      <BlurView intensity={90} style={BlockSessionBoardStyle} tint={'dark'}>
        {BlocklistParams.map(([label, option]) => (
          <BlockSessionParam key={label} label={label} option={option} />
        ))}
      </BlurView>

      <TiedSButton
        text={'START'}
        onPress={() => navigation.navigate(TabScreens.HOME)}
      />
    </TiedSLinearBackground>
  )
}
