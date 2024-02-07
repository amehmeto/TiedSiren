import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { T } from '../theme'
import { Platform, StatusBar, StyleSheet } from 'react-native'

export function TiedSLinearBackground(
  props: Readonly<{ children: React.ReactNode }>,
) {
  return (
    <LinearGradient
      colors={[T.color.purple, T.color.lightBlueShade, T.color.lightBlue]}
      start={{ x: 0.4, y: 0.5 }}
      end={{ x: 1.5, y: 0.6 }}
      style={styles.container}
    >
      {props.children}
    </LinearGradient>
  )
}

const statusBarHeight =
  T.spacing.medium + Platform.OS === 'android'
    ? StatusBar.currentHeight ?? 0
    : 0

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: T.spacing.large,
    statusBarHeight,
  },
})
