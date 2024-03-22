import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { T } from '../theme'
import { useState } from 'react'

export function TiedSTextInput(props: Readonly<TextInputProps>) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <TextInput
      style={[
        styles.input,
        { borderColor: isFocused ? T.color.lightBlue : 'transparent' },
      ]}
      placeholderTextColor={T.color.white}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
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
    flex: 1,
  },
})
