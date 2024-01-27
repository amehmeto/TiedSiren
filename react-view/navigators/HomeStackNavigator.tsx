import React from 'react'
import { HomeScreen } from '../screens/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateBlockSessionScreen } from '../screens/CreateBlockSessionScreen'

const Stack = createStackNavigator()

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateBlockSession"
        options={{ headerShown: true }}
        component={CreateBlockSessionScreen}
      />
    </Stack.Navigator>
  )
}
