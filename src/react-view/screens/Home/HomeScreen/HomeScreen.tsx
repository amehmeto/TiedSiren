import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'
import { TiedSirenLogoSvg } from './TiedSirenLogoSvg.tsx'
import 'react-native-gesture-handler'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { T } from '../../../design-system/theme.ts'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { HomeStackScreens } from '../../../navigators/screen-lists/HomeStackScreens.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../core/_redux_/createStore.ts'
import { selectHomeViewModel } from './home.view-model.ts'
import { exhaustiveGuard } from '../../../../common/exhaustive-guard.ts'
import { NoSessionBoard } from './NoSessionBoard.tsx'
import { SessionsBoard } from './SessionsBoard.tsx'
import { HomeViewModel } from './home-view-model.types.ts'
import { dateProvider } from '../../../dependencies.ts'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectHomeViewModel>
  >((rootState) => selectHomeViewModel(rootState, dateProvider))

  console.log(viewModel)
  console.log('NOW Date', new Date())
  console.log('NOW toISOString', new Date().toISOString())
  console.log('NOW toLocaleString', new Date().toLocaleString())

  const [activeSessionsNode, scheduledSessionsNode]: ReactNode[] = (() => {
    switch (viewModel.type) {
      case HomeViewModel.WithoutActiveNorScheduledSessions:
        return [
          <NoSessionBoard sessions={viewModel.activeSessions} />,
          <NoSessionBoard sessions={viewModel.scheduledSessions} />,
        ]
      case HomeViewModel.WithActiveWithoutScheduledSessions:
        return [
          <SessionsBoard sessions={viewModel.activeSessions} />,
          <NoSessionBoard sessions={viewModel.scheduledSessions} />,
        ]
      case HomeViewModel.WithoutActiveWithScheduledSessions:
        return [
          <NoSessionBoard sessions={viewModel.activeSessions} />,
          <SessionsBoard sessions={viewModel.scheduledSessions} />,
        ]
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
      {scheduledSessionsNode}

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
