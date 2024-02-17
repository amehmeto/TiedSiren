import React from 'react'
import { BlurView } from 'expo-blur'
import { T } from '../theme'
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

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
    borderRadius: T.border.radius.roundedSmall,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',

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
        boxShadow: `5px 5px 10px ${T.color.shadow}`,
      },
    }),
  },
})
