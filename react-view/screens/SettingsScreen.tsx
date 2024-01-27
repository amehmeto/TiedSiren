import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'Settings'>
}
export function SettingsScreen({ navigation }: Readonly<SettingsScreenProps>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  )
}
