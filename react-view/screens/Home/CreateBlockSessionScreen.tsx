import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { HomeStackScreens } from '../../navigators/screen-lists/HomeStackScreens'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { BlockSessionParam } from './BlockSessionParam'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
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
        onPress={() => navigation.navigate(HomeStackScreens.MAIN_HOME)}
      />
    </TiedSLinearBackground>
  )
}
