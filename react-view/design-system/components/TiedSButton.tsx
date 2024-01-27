import { Pressable, Text } from 'react-native'
import React from 'react'

export function TiedSButton(props: { onPress: () => any; text: string }) {
  return (
    <Pressable
      style={{
        borderRadius: 5,
        backgroundColor: 'rgba(0,212,255,1)',
        marginTop: 20,
        padding: 10,
        shadowColor: '#1e1e1e',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          borderRadius: 5,
        }}
      >
        {props.text}
      </Text>
    </Pressable>
  )
}
