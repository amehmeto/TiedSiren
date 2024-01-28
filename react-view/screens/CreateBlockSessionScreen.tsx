import { Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TabScreens } from '../navigators/BottomTabNavigator'
import { TiedSButton } from '../design-system/components/TiedSButton'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'
import { T } from '../design-system/theme'

const BlockSessionParamStyle = {
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
  paddingTop: T.spacing.large,
  paddingBottom: T.spacing.large,
  paddingLeft: T.spacing.small,
  paddingRight: T.spacing.small,
}

const BlockSessionBoardStyle = {
  padding: T.spacing.medium,
  marginTop: T.spacing.small,
  marginBottom: T.spacing.small,
  borderRadius: T.borderRadius.roundedSmall,
  shadowColor: T.color.shadow,
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
  const labelStyle = { color: T.color.text }
  const optionStyle = { color: T.color.lightBlue }

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
