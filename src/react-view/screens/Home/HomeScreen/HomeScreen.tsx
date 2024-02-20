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
import { exhaustiveGuard } from '../../../../common/exhaustive-guard.ts'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
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
            <Text style={styles.title}>{viewModel.activeSessions.title}</Text>
            <Text style={[styles.text, { marginBottom: T.spacing.large }]}>
              {viewModel.activeSessions.message}
            </Text>
          </>
        )
      case HomeViewModelType.OneOrMoreBlockSessions:
        return (
          <>
            <Text style={styles.title}>ACTIVE SESSIONS</Text>
            <FlatList
              style={[{ marginBottom: T.spacing.large }]}
              data={viewModel.activeSessions.blockSessions}
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
      <Text style={styles.greetings}>{viewModel.greetings}</Text>
      <Text style={[styles.text, { marginBottom: T.spacing.large }]}>
        Let's make it productive
      </Text>

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
