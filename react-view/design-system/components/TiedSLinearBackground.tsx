import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { T } from '../theme'
import { Platform, StatusBar } from 'react-native'

export function TiedSLinearBackground(props: { children: React.ReactNode }) {
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight : 0
  const paddingTop = T.spacing.medium + (statusBarHeight ? statusBarHeight : 0)

  return (
    <LinearGradient
      colors={[T.color.purple, T.color.lightBlueShade, T.color.lightBlue]}
      start={{ x: 0.4, y: 0.5 }}
      end={{ x: 1.5, y: 0.6 }}
      style={{ flex: 1, padding: T.spacing.large, paddingTop }}
    >
      {props.children}
    </LinearGradient>
  )
}
