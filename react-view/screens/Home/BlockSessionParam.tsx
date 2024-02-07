import { T } from '../../design-system/theme'
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native'
import React from 'react'
import { Blocklist } from '../../../core/blocklist/blocklist'

type Device = {}

export function BlockSessionParam({
  label,
  onChangeText,
  onBlur,
  values,
}: Readonly<{
  label: string
  option: string
  onChangeText: (text: string) => void
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  values: {
    blocklists: Blocklist[]
    devices: Device[]
    start: string
    ends: string
    name: string
  }
}>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.option}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={values.name}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: T.spacing.medium,
    paddingBottom: T.spacing.medium,
    paddingLeft: T.spacing.small,
    paddingRight: T.spacing.small,
  },
  label: {
    color: T.color.text,
  },
  option: {
    color: T.color.lightBlue,
    textAlign: 'right',
  },
})
