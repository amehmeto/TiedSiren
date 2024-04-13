import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
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
import {
  HomeViewModel,
  HomeViewModelType,
  SessionBoardTitle,
  ViewModelBlockSession,
} from './home-view-model.types.ts'
import { dependencies } from '../../../dependencies.ts'

async function notifyActiveSessionsStartAndEnd(
  viewModel: HomeViewModelType,
  previousActiveSessionsRef: React.MutableRefObject<ViewModelBlockSession[]>,
) {
  const { notificationService } = dependencies

  function notInPreviousActiveSessions(session: ViewModelBlockSession) {
    return !previousActiveSessions.some(
      (prevSession) => prevSession.id === session.id,
    )
  }

  function notInCurrentActivesSessions(
    activeSessions: ViewModelBlockSession[],
    session: ViewModelBlockSession,
  ) {
    return !activeSessions.some(
      (activeSession) => activeSession.id === session.id,
    )
  }

  const currentActiveSessions =
    viewModel.activeSessions.title === SessionBoardTitle.ACTIVE_SESSIONS
      ? viewModel.activeSessions.blockSessions
      : []
  const previousActiveSessions = previousActiveSessionsRef.current
  const newActiveSessions = currentActiveSessions.filter((session) =>
    notInPreviousActiveSessions(session),
  )
  const endedSessions = previousActiveSessions.filter((session) =>
    notInCurrentActivesSessions(currentActiveSessions, session),
  )

  for (const session of newActiveSessions) {
    await notificationService.pushNotification(
      `Session ${session.id} has started`,
    )
  }
  for (const session of endedSessions) {
    await notificationService.pushNotification(
      `Session ${session.id} has ended`,
    )
  }

  previousActiveSessionsRef.current = currentActiveSessions
}

export function HomeScreen({
  navigation,
}: Readonly<{
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}>) {
  const { dateProvider } = dependencies
  const [now, setNow] = useState<Date>(dateProvider.getNow())
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectHomeViewModel>
  >((rootState) => selectHomeViewModel(rootState, now))

  const previousActiveSessionsRef = useRef<ViewModelBlockSession[]>([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(dateProvider.getNow())
    }, 1_000)
    return () => clearInterval(intervalId)
  }, [dateProvider, now])

  useEffect(() => {
    notifyActiveSessionsStartAndEnd(viewModel, previousActiveSessionsRef)
  }, [viewModel])

  const [activeSessionsNode, scheduledSessionsNode]: ReactNode[] = (() => {
    switch (viewModel.type) {
      case HomeViewModel.WithoutActiveNorScheduledSessions:
        return [
          <NoSessionBoard key={0} sessions={viewModel.activeSessions} />,
          <NoSessionBoard key={1} sessions={viewModel.scheduledSessions} />,
        ]
      case HomeViewModel.WithActiveWithoutScheduledSessions:
        return [
          <SessionsBoard key={0} sessions={viewModel.activeSessions} />,
          <NoSessionBoard key={1} sessions={viewModel.scheduledSessions} />,
        ]
      case HomeViewModel.WithoutActiveWithScheduledSessions:
        return [
          <NoSessionBoard key={0} sessions={viewModel.activeSessions} />,
          <SessionsBoard key={1} sessions={viewModel.scheduledSessions} />,
        ]
      case HomeViewModel.WithActiveAndScheduledSessions:
        return [
          <SessionsBoard key={0} sessions={viewModel.activeSessions} />,
          <SessionsBoard key={1} sessions={viewModel.scheduledSessions} />,
        ]
      default:
        return exhaustiveGuard(viewModel)
    }
  })()

  return (
    <TiedSLinearBackground>
      <TiedSirenLogoSvg />
      <Text style={styles.greetings}>{viewModel.greetings}</Text>
      <Text style={styles.text}>{"Let's make it productive"}</Text>

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
  text: { color: T.color.text, marginBottom: T.spacing.large },
})
