import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from './App'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'BlockList'>
}
export function BlockListScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Blocklists</Text>
    </View>
  )
}
