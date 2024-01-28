import React from 'react'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateBlockSessionScreen } from '../screens/Home/CreateBlockSessionScreen'
import { TabScreens } from './BottomTabNavigator'

const Stack = createStackNavigator()

export enum HomeStackScreens {
  CREATE_BLOCK_SESSION = 'CreateBlockSession',
}

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={TabScreens.HOME}>
      <Stack.Screen
        name={TabScreens.HOME}
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
