import { SettingsScreen } from '../screens/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { T } from '../design-system/theme'
import { BlocklistStackNavigator } from './BlocklistStackNavigator'
import { TabScreens } from './screen-lists/TabScreens'
import { EditBlocklistScreen } from '../screens/Blocklists/EditBlocklistScreen'

const Tab = createBottomTabNavigator()

export function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: T.color.darkBlue,
          height: 80,
          padding: T.spacing.small,
        },
        tabBarActiveTintColor: T.color.lightBlue,
        tabBarInactiveTintColor: T.color.inactive,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={TabScreens.HOME}
        //component={HomeStackNavigator}
        component={EditBlocklistScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="light-up" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.BLOCKLIST}
        component={BlocklistStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shield" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.SETTINGS}
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
