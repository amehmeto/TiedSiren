import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import { BottomTabNavigator } from './src/react-view/navigators/BottomTabNavigator'
import { T } from './src/react-view/design-system/theme'
import { createStore } from './src/core/_redux_/createStore'
import { FakeDataBlockSessionRepository } from './src/infra/block-session-repository/fake-data.block-session.repository'
import { Provider } from 'react-redux'

const blockSessionRepository = new FakeDataBlockSessionRepository()

const store = createStore({
  blockSessionRepository,
})

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android')
      NavigationBar.setBackgroundColorAsync(T.color.darkBlue).catch(
        (e: never) => {
          console.error('Failed to set navigation bar color', e)
        },
      )
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </Provider>
  )
}
