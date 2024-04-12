import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { Platform } from 'react-native'
import { BottomTabNavigator } from './src/react-view/navigators/BottomTabNavigator'
import { T } from './src/react-view/design-system/theme'
import { createStore } from './src/core/_redux_/createStore'
import { FakeDataBlockSessionRepository } from './src/infra/block-session-repository/fake-data.block-session.repository'
import { Provider } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'
import {
  StateBuilderProvider,
  stateBuilderProvider,
} from './src/core/_tests_/state-builder.ts'
import { buildBlockSession } from './src/core/_tests_/data-builders/block-session.builder.ts'
import { dependencies } from './src/react-view/dependencies.ts'
import { toHHmm } from './src/react-view/screens/Home/shared/SelectTime.tsx'

const blocklists = await dependencies.blocklistRepository.getBlocklists()

const now = dependencies.dateProvider.getNow()
const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000)

const preloadedState: StateBuilderProvider = stateBuilderProvider()
const preloadedBlockSessions = [
  buildBlockSession({
    name: 'Working time',
    start: toHHmm(now),
    end: toHHmm(oneMinuteFromNow),
  }),
  buildBlockSession({
    name: 'Sleeping time',
    start: toHHmm(oneMinuteFromNow),
  }),
]
preloadedState.setState((builder) =>
  builder.withBlockSessions(preloadedBlockSessions).withBlocklists(blocklists),
)
;(
  dependencies.blockSessionRepository as FakeDataBlockSessionRepository
).entities = new Map(
  preloadedBlockSessions.map((blockSession) => [blockSession.id, blockSession]),
)

const store = createStore(dependencies, preloadedState.getState())

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'android')
      NavigationBar.setBackgroundColorAsync(T.color.darkBlue).catch(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
          // eslint-disable-next-line no-console
          console.error('Failed to set navigation bar color', e)
        },
      )
  }, [])

  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  )
}
