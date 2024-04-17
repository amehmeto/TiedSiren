import { HomeScreen } from '../screens/Home/HomeScreen/HomeScreen.tsx'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStackScreens } from './screen-lists/HomeStackScreens'
import { CreateBlockSessionScreen } from '../screens/Home/CreateBlockSessionScreen/CreateBlockSessionScreen.tsx'
import { EditBlockSessionScreen } from '../screens/Home/EditBlockSessionScreen/EditBlockSessionScreen.tsx'
import { ScreenList } from './screen-lists/screenLists.ts'
import { T } from '../design-system/theme.ts'

const Stack = createStackNavigator<ScreenList>()

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={HomeStackScreens.MAIN_HOME}
      screenOptions={{
        headerStyle: { backgroundColor: T.color.darkBlue },
        headerTintColor: T.color.lightBlue,
        headerTitleStyle: { fontWeight: T.font.weight.bold },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={HomeStackScreens.MAIN_HOME}
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Stack.Screen
        name={HomeStackScreens.CREATE_BLOCK_SESSION}
        options={{ headerShown: true }}
        component={CreateBlockSessionScreen}
      />
      <Stack.Screen
        name={HomeStackScreens.EDIT_BLOCK_SESSION}
        options={{ headerShown: true }}
        component={EditBlockSessionScreen}
      />
    </Stack.Navigator>
  )
}
