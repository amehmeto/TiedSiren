import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { TiedSirenLogoSvg } from './TiedSirenLogoSvg'
import 'react-native-gesture-handler'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { CurrentSessionBoard } from './CurrentSessionBoard'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { T } from '../../design-system/theme'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { HomeStackScreens } from '../../navigators/screen-lists/HomeStackScreens'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { blockSessionRepository } from '../../dependencies'
import { BlockSession } from '../../../core/block-session/block-session'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
  const [currentSessions, setCurrentSessions] = useState<BlockSession[]>([])

  useEffect(() => {
    blockSessionRepository
      .getCurrentSessions()
      .then((sessions) => setCurrentSessions(sessions))
  }, [])

  return (
    <TiedSLinearBackground>
      <TiedSirenLogoSvg />
      <Text style={styles.greetings}>Good Afternoon</Text>
      <Text style={styles.text}>Let's make it productive</Text>

      <Text style={styles.title}>ACTIVE SESSIONS</Text>

      <FlatList
        data={currentSessions}
        renderItem={({ item }) => <CurrentSessionBoard session={item} />}
      />

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
    fontWeight: T.fontWeight.bold,
    color: T.color.text,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  },
  greetings: {
    color: T.color.text,
    fontWeight: T.fontWeight.bold,
    fontSize: T.size.medium,
  },
  text: { color: T.color.text },
})
