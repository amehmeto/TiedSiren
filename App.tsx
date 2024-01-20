import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from './HomeScreen'
import { BlockListScreen } from './BlocklistScreen'
import { SettingsScreen } from './SettingsScreen'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

export type BottomTabList = {
  Home: undefined
  BlockList: undefined
  Settings: undefined
  Details: undefined
}
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Blocklist" component={BlockListScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
