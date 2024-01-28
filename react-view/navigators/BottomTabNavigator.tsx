import { HomeStackNavigator } from './HomeStackNavigator'
import { BlockListScreen } from '../screens/BlocklistScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { T } from '../design-system/theme'

const Tab = createBottomTabNavigator()

export enum TabScreens {
  HOME = 'Home',
  BLOCKLIST = 'Blocklist',
  SETTINGS = 'Settings',
}

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
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="light-up" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={TabScreens.BLOCKLIST}
        component={BlockListScreen}
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
