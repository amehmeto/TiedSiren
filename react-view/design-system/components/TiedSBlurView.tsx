import React from 'react'
import { BlurView } from 'expo-blur'
import { T } from '../theme'

export function TiedSBlurView(props: {
  children: React.ReactNode
  style?: Record<string, any>
}) {
  const currentSessionBoardStyle = {
    padding: T.spacing.medium,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
    borderRadius: T.borderRadius.roundedSmall,
    shadowColor: T.color.shadow,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20, // for Android
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    ...props.style,
  }

  return (
    <BlurView intensity={90} style={currentSessionBoardStyle} tint={'dark'}>
      {props.children}
    </BlurView>
  )
}
