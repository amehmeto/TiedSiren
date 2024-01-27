import { Text, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'BlockList'>
}
export function BlockListScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  return (
    <TiedSLinearBackground>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Blocklists</Text>
      </View>
    </TiedSLinearBackground>
  )
}
