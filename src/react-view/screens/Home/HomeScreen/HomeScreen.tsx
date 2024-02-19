import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ReactNode } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { TiedSirenLogoSvg } from './TiedSirenLogoSvg.tsx'
import 'react-native-gesture-handler'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'
import { CurrentSessionBoard } from './CurrentSessionBoard.tsx'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { T } from '../../../design-system/theme.ts'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { HomeStackScreens } from '../../../navigators/screen-lists/HomeStackScreens.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../core/createStore.ts'
import { HomeViewModelType, selectHomeViewModel } from './home.view-model.ts'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

const exhaustiveGuard = (x: never): never => {
  throw new Error('exhaustiveGuard: unreachable code')
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectHomeViewModel>
  >((rootState) =>
    selectHomeViewModel(rootState, () => new Date().toISOString()),
  )

  const activeSessionsNode: ReactNode = (() => {
    switch (viewModel.type) {
      case HomeViewModelType.NoBlockSessions:
        return (
          <>
            <Text style={styles.title}>No ACTIVE SESSIONS</Text>

            <Text style={styles.text}>{viewModel.message}</Text>
          </>
        )
      case HomeViewModelType.OneOrMoreBlockSessions:
        return (
          <>
            <Text style={styles.title}>ACTIVE SESSIONS</Text>

            <FlatList
              data={viewModel.blockSessions}
              renderItem={({ item }) => <CurrentSessionBoard session={item} />}
            />
          </>
        )
      default:
        return exhaustiveGuard(viewModel)
    }
  })()

  return (
    <TiedSLinearBackground>
      <TiedSirenLogoSvg />
      <Text style={styles.greetings}>Good Afternoon</Text>
      <Text style={styles.text}>Let's make it productive</Text>

      {activeSessionsNode}

      <Text style={styles.title}>NO SCHEDULED SESSIONS</Text>

      <Text style={styles.text}>
        Scheduled sessions start automatically and help you to stick to a plan,
        giving you distraction-free focus when you need it most
      </Text>

      <TiedSButton
        text={'CREATE A BLOCK SESSION'}
        onPress={() =>
          navigation.navigate(HomeStackScreens.CREATE_BLOCK_SESSION)
        }
      />
    </TiedSLinearBackground>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: T.font.weight.bold,
    color: T.color.text,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  },
  greetings: {
    color: T.color.text,
    fontWeight: T.font.weight.bold,
    fontSize: T.size.medium,
  },
  text: { color: T.color.text },
})
