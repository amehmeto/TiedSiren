import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export function TiedSLinearBackground(props: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={['rgb(69,64,196)', 'rgb(105,178,225)', 'rgba(0,212,255,1)']}
      start={{ x: 0.4, y: 0.5 }}
      end={{ x: 1.5, y: 0.6 }}
      style={{ flex: 1, padding: 20 }}
    >
      {props.children}
    </LinearGradient>
  )
}
