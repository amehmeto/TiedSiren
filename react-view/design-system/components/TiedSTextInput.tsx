import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { T } from '../theme'

export function TiedSTextInput(props: Readonly<TextInputProps>) {
  return (
    <TextInput
      style={[styles.input]}
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
    borderColor: T.color.lightBlue,
    borderRadius: T.border.radius.roundedSmall,
    color: T.color.white,
  },
})
