import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import { BottomTabNavigator } from './src/react-view/navigators/BottomTabNavigator'
import { T } from './src/react-view/design-system/theme'
import { createStore } from './src/core/_redux_/createStore'
import { FakeDataBlockSessionRepository } from './src/infra/block-session-repository/fake-data.block-session.repository'
import { Provider } from 'react-redux'
import { FakeDataBlocklistRepository } from './src/infra/blocklist-repository/fake-data.blocklist.repository'

const blockSessionRepository = new FakeDataBlockSessionRepository()
const blocklistRepository = new FakeDataBlocklistRepository()

const store = createStore({
  blockSessionRepository,
  blocklistRepository,
})

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android')
      NavigationBar.setBackgroundColorAsync(T.color.darkBlue).catch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
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
