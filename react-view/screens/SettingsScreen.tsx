import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'Settings'>
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
