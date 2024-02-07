import React from 'react'
import { BlurView } from 'expo-blur'
import { T } from '../theme'
import { Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native'

export function TiedSBlurView(
  props: Readonly<{
    children: React.ReactNode
    style?: StyleProp<ViewStyle>
  }>,
) {
  return (
    <BlurView
      intensity={90}
      style={[styles.container, props.style]}
      tint={'dark'}
    >
      {props.children}
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: T.spacing.medium,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
    borderRadius: T.borderRadius.roundedSmall,
    flexDirection: 'row',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        shadowColor: T.color.shadow,
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: T.shadow.opacity,
        shadowRadius: T.shadow.radius,
      },
      android: {
        elevation: 20,
      },
      web: {
        boxShadow: `5px 5px 10px ${T.color.shadow}`,
      },
    }),
  },
})
