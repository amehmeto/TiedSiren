import { HomeScreen } from '../screens/Home/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateBlockSessionScreen } from '../screens/Home/CreateBlockSessionScreen'
import { HomeStackScreens } from './screen-lists/HomeStackScreens'

const Stack = createStackNavigator()

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={HomeStackScreens.MAIN_HOME}>
      <Stack.Screen
        name={HomeStackScreens.MAIN_HOME}
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
