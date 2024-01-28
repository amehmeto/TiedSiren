import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { T } from '../theme'

export function TiedSLinearBackground(props: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={[T.color.purple, T.color.lightBlueShade, T.color.lightBlue]}
      start={{ x: 0.4, y: 0.5 }}
      end={{ x: 1.5, y: 0.6 }}
      style={{ flex: 1, padding: T.spacing.large }}
    >
      {props.children}
    </LinearGradient>
  )
}
