import React from 'react'
import { TextInput, StyleSheet, TextInputProps } from 'react-native'
import { T } from '../theme'
import { color } from 'react-native-elements/dist/helpers'

export function TiedSTextInput(props: Readonly<TextInputProps>) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={T.color.white}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: T.spacing.small,
    fontSize: T.font.size.regular,
    borderWidth: 1,
    borderColor: T.color.white,
    borderRadius: T.border.radius.roundedSmall,
  },
})
