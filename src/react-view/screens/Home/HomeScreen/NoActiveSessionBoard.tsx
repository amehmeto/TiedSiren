import { StyleSheet, Text } from 'react-native'
import { T } from '../../../design-system/theme.ts'

import {
  WithoutActiveNorScheduledSessions,
  WithoutActiveWithScheduledSessions,
} from './home-view-model.types.ts'

export function NoActiveSessionBoard(
  props: Readonly<{
    viewModel:
      | WithoutActiveNorScheduledSessions
      | WithoutActiveWithScheduledSessions
  }>,
) {
  return (
    <>
      <Text style={styles.title}>{props.viewModel.activeSessions.title}</Text>
      <Text style={[styles.text, { marginBottom: T.spacing.large }]}>
        {props.viewModel.activeSessions.message}
      </Text>
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
