import { createStackNavigator } from '@react-navigation/stack'
import { BlocklistScreen } from '../screens/Blocklists/BlocklistScreen'
import { EditBlocklistScreen } from '../screens/Blocklists/EditBlocklistScreen'
import { BlocklistsStackScreens } from './screen-lists/BlocklistsStackScreens'
import { EditPlatformBlocklistScreen } from '../screens/Blocklists/EditPlatformBlocklistScreen'

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

      <Stack.Screen
        name={BlocklistsStackScreens.EDIT_PLATFORM_BLOCKLIST}
        options={{ headerShown: true }}
        component={EditPlatformBlocklistScreen}
      />
    </Stack.Navigator>
  )
}
