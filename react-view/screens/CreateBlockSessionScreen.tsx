import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TabScreens } from '../navigators/BottomTabNavigator'
import { TiedSButton } from '../design-system/components/TiedSButton'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'
import { T } from '../design-system/theme'
import { TiedSBlurView } from '../design-system/components/TiedSBlurView'

type Props = {
  label: string
  option: string
}

function BlockSessionParam({ label, option }: Props) {
  const BlockSessionParamStyle = {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingTop: T.spacing.medium,
    paddingBottom: T.spacing.medium,
    paddingLeft: T.spacing.small,
    paddingRight: T.spacing.small,
  }
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
  const BlockSessionBlurViewStyle = {
    flexDirection: 'column' as const,
    alignItems: 'stretch' as const,
  }

  const BlocklistParams = [
    ['Blocklists', 'Distractions'],
    ['Devices', 'Huawei P20, Lenovo Tab'],
    ['Starts', '19:00'],
    ['Ends', '21:00'],
    ['Session Name', 'Working time'],
  ]

  return (
    <TiedSLinearBackground>
      <TiedSBlurView style={BlockSessionBlurViewStyle}>
        {BlocklistParams.map(([label, option]) => (
          <BlockSessionParam key={label} label={label} option={option} />
        ))}
      </TiedSBlurView>

      <TiedSButton
        text={'START'}
        onPress={() => navigation.navigate(TabScreens.HOME)}
      />
    </TiedSLinearBackground>
  )
}
