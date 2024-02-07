import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator } from './react-view/navigators/BottomTabNavigator'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { T } from './react-view/design-system/theme'
import { Platform } from 'react-native'

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android')
      NavigationBar.setBackgroundColorAsync(T.color.darkBlue).catch((e) => {
        console.error('Failed to set navigation bar color', e)
      })
  }, [])

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
