import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from './App'
import React from 'react'
import { Button, Text, View } from 'react-native'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Home'>
}

export function Home({ navigation }: HomeScreenProps) {
  return (
    <View style={{}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}
