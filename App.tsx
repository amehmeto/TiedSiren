import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator } from './react-view/navigators/BottomTabNavigator'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { T } from './react-view/design-system/theme'

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(T.color.darkBlue)
  }, [])

  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
