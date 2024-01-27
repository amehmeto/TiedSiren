import { HomeStackNavigator } from './HomeStackNavigator'
import { BlockListScreen } from '../screens/BlocklistScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, Ionicons } from '@expo/vector-icons'

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
        tabBarStyle: { backgroundColor: '#0C207A', height: 80, padding: 20 },
        tabBarActiveTintColor: '#15ABFF',
        tabBarInactiveTintColor: '#d1e9f8',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="light-up" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Blocklist"
        component={BlockListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shield" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
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
