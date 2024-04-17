import { createStackNavigator } from '@react-navigation/stack'
import { BlocklistScreen } from '../screens/Blocklists/BlocklistScreen/BlocklistScreen.tsx'
import { BlocklistsStackScreens } from './screen-lists/BlocklistsStackScreens'
import { CreateBlocklistScreen } from '../screens/Blocklists/CreateBlocklistScreen/CreateBlocklistScreen.tsx'
import { EditBlocklistScreen } from '../screens/Blocklists/EditBlocklistScreen/EditBlocklistScreen.tsx'
import { ScreenList } from './screen-lists/screenLists.ts'
import { T } from '../design-system/theme.ts'

const Stack = createStackNavigator<ScreenList>()

export function BlocklistStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={BlocklistsStackScreens.MAIN_BLOCKLIST}
      screenOptions={{
        headerStyle: { backgroundColor: T.color.darkBlue },
        headerTintColor: T.color.lightBlue,
        headerTitleStyle: { fontWeight: T.font.weight.bold },
        headerShadowVisible: false,
      }}
    >
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
        name={BlocklistsStackScreens.CREATE_BLOCK_LIST}
        options={{ headerShown: true }}
        component={CreateBlocklistScreen}
      />
    </Stack.Navigator>
  )
}
