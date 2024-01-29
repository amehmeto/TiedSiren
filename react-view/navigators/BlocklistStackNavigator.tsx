import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { BlocklistScreen } from '../screens/Blocklists/BlocklistScreen'
import { EditBlocklistScreen } from '../screens/Blocklists/EditBlocklistScreen'
import { BlocklistsStackScreens } from './screen-lists/BlocklistsStackScreens'

const Stack = createStackNavigator()

export function BlocklistStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={BlocklistsStackScreens.MAIN_BLOCKLIST}>
      <Stack.Screen
        name={BlocklistsStackScreens.MAIN_BLOCKLIST}
        component={BlocklistScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={BlocklistsStackScreens.EDIT_BLOCKLIST}
        options={{ headerShown: true }}
        component={EditBlocklistScreen}
      />
    </Stack.Navigator>
  )
}
