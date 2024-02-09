import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native'
import React from 'react'
import { T } from '../theme'

export function TiedSButton(
  props: Readonly<{
    onPress: () => void
    text: string
    style?: StyleProp<ViewStyle>
  }>,
) {
  return (
    <Pressable style={[styles.container, props.style]} onPress={props.onPress}>
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

    ...Platform.select({
      ios: {
        shadowColor: T.color.shadow,
        shadowOffset: {
          width: T.shadow.offset.width,
          height: T.shadow.offset.height,
        },
        shadowOpacity: T.shadow.opacity,
        shadowRadius: T.shadow.radius,
      },
      android: {
        elevation: 20,
      },
      web: {
        boxShadow: `${T.shadow.offset.width}px ${T.shadow.offset.height}px 10px ${T.color.shadow}`,
      },
    }),
  },
  buttonText: {
    fontWeight: T.fontWeight.bold,
    color: T.color.text,
    textAlign: 'center',
    borderRadius: T.borderRadius.roundedSmall,
  },
})
