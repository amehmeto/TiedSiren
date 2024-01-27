import React from 'react'
import { BlurView } from 'expo-blur'

export function TiedSBlurView(props: { children: React.ReactNode }) {
  const currentSessionBoardStyle = {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#1e1e1e',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20, // for Android
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  }

  return (
    <BlurView intensity={90} style={currentSessionBoardStyle} tint={'dark'}>
      {props.children}
    </BlurView>
  )
}
