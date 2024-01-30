import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'
import { ScreenList } from '../navigators/screen-lists/screenLists'

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, 'Settings'>
}
export function SettingsScreen({ navigation }: Readonly<SettingsScreenProps>) {
  return (
    <TiedSLinearBackground>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Settings</Text>
      </View>
    </TiedSLinearBackground>
  )
}