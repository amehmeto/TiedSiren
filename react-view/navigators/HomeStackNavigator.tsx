import React from 'react'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateBlockSessionScreen } from '../screens/Home/CreateBlockSessionScreen'

const Stack = createStackNavigator()

export enum HomeStackScreens {
  HOME = 'HOME',
  CREATE_BLOCK_SESSION = 'CreateBlockSession',
}

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={HomeStackScreens.HOME}>
      <Stack.Screen
        name={HomeStackScreens.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={HomeStackScreens.CREATE_BLOCK_SESSION}
        options={{ headerShown: true }}
        component={CreateBlockSessionScreen}
      />
    </Stack.Navigator>
  )
}
