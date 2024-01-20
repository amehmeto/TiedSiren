import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text, View } from 'react-native'
import { BottomTabList } from './App'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'Home'>
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}
