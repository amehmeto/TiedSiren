import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import { BottomTabNavigator } from './src/react-view/navigators/BottomTabNavigator'
import { T } from './src/react-view/design-system/theme'
import { AppStore, createStore } from './src/core/_redux_/createStore'
import { Provider } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'
import { dependencies } from './src/react-view/dependencies.ts'
import { preloadedStateForManualTesting } from './src/react-view/preloadedStateForManualTesting.tsx'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default function App() {
  const [store, setStore] = useState<AppStore | null>(null)

  useEffect(() => {
    async function initializeStore() {
      const preloadedState = await preloadedStateForManualTesting()
      const createdStore = createStore(dependencies, preloadedState.getState())
      setStore(createdStore)
    }

    initializeStore()

    if (Platform.OS === 'android')
      NavigationBar.setBackgroundColorAsync(T.color.darkBlue).catch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
          // eslint-disable-next-line no-console
          console.error('Failed to set navigation bar color', e)
        },
      )
  }, [])

  if (!store) return null

  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <StatusBar style={'auto'} />
          <BottomTabNavigator />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  )
}
