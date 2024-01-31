import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { T } from '../theme'

export function TiedSButton(props: { onPress: () => any; text: string }) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: T.borderRadius.roundedSmall,
    backgroundColor: T.color.lightBlue,
    marginTop: T.spacing.large,
    padding: T.spacing.small,
    shadowColor: T.color.shadow,
    shadowOffset: {
      width: T.shadow.offset.width,
      height: T.shadow.offset.height,
    },
    shadowOpacity: T.shadow.opacity,
    shadowRadius: T.shadow.radius,
  },
  buttonText: {
    fontWeight: T.fontWeight.bold,
    fontFamily: T.fontFamily.primary,
    color: T.color.text,
    textAlign: 'center',
    borderRadius: T.borderRadius.roundedSmall,
  },
})
