import { FlatList, StyleSheet, Text } from 'react-native'
import { T } from '../../../design-system/theme.ts'
import { SessionCard } from './SessionCard.tsx'

import { WithActiveWithoutScheduledSessions } from './home-view-model.types.ts'

export function ActiveSessionsBoard(
  props: Readonly<{
    viewModel: WithActiveWithoutScheduledSessions
  }>,
) {
  return (
    <>
      <Text style={styles.title}>ACTIVE SESSIONS</Text>
      <FlatList
        style={styles.cardList}
        data={props.viewModel.activeSessions.blockSessions}
        renderItem={({ item }) => <SessionCard session={item} />}
      />
    </>
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
  text: { color: T.color.text },
  cardList: {
    marginBottom: T.spacing.small,
    flexGrow: 0,
  },
})
