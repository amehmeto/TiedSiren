import { T } from '../../design-system/theme'
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export function BlockSessionParam({
  label,
  option,
}: {
  label: string
  option: string
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.option}>{option}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    paddingTop: T.spacing.medium,
    paddingBottom: T.spacing.medium,
    paddingLeft: T.spacing.small,
    paddingRight: T.spacing.small,
  },
  label: {
    color: T.color.text,
  },
  option: { color: T.color.lightBlue },
})
