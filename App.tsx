import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import { BottomTabNavigator } from './src/react-view/navigators/BottomTabNavigator'
import { T } from './src/react-view/design-system/theme'
import { Provider } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'
import { dependencies } from './src/react-view/dependencies.ts'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { tieSirens } from './src/core/siren/usecases/tie-sirens.usecase.ts'
import { storePromise } from './src/react-view/preloadedStateForManualTesting.ts'
import { AppStore } from './src/core/_redux_/createStore.ts'
import { RealBackgroundTaskService } from './src/infra/background-task-service/real.background-task.service.ts'

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
    storePromise.then(setStore)

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

  store.dispatch(tieSirens())
  ;(dependencies.backgroundTaskService as RealBackgroundTaskService)
    .initialize(store)
    // eslint-disable-next-line no-console
    .then(() => console.log('task service initialised'))

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
