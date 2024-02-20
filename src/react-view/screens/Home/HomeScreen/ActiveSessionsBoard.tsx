import { ActiveBlockSessionsViewModel } from './home.view-model.ts'
import { FlatList, StyleSheet, Text } from 'react-native'
import { T } from '../../../design-system/theme.ts'
import { ActiveSession } from './ActiveSession.tsx'

export function ActiveSessionsBoard(
  props: Readonly<{
    viewModel: ActiveBlockSessionsViewModel
  }>,
) {
  return (
    <>
      <Text style={styles.title}>ACTIVE SESSIONS</Text>
      <FlatList
        style={[{ marginBottom: T.spacing.large }]}
        data={props.viewModel.activeSessions.blockSessions}
        renderItem={({ item }) => <ActiveSession session={item} />}
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
})
