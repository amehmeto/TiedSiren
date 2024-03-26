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
import { RealDateProvider } from './src/infra/date-provider/real.date-provider.ts'
import { InMemorySirenTier } from './src/infra/siren-binder/in-memory-siren.tier.ts'
import { FakeDataInstalledAppsRepository } from './src/infra/installed-apps-repository/fake-data.installed-apps.repository.ts'
import { FakeDataSirensRepository } from './src/infra/fake-data.sirens-repository.ts'

const blockSessionRepository = new FakeDataBlockSessionRepository()
const blocklistRepository = new FakeDataBlocklistRepository()
const sirenTier = new InMemorySirenTier()
const dateProvider = new RealDateProvider()
const installedAppRepository = new FakeDataInstalledAppsRepository()
const sirensRepository = new FakeDataSirensRepository()

const store = createStore({
  blockSessionRepository,
  blocklistRepository,
  sirenTier,
  dateProvider,
  installedAppRepository,
  sirensRepository,
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
