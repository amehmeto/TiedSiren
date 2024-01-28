import { Pressable, Text } from 'react-native'
import React from 'react'
import { T } from '../theme'

export function TiedSButton(props: { onPress: () => any; text: string }) {
  return (
    <Pressable
      style={{
        borderRadius: T.borderRadius.roundedSmall,
        backgroundColor: T.color.lightBlue,
        marginTop: T.spacing.large,
        padding: T.spacing.small,
        shadowColor: T.color.shadow,
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
          fontWeight: T.fontWeight.bold,
          color: T.color.text,
          textAlign: 'center',
          borderRadius: T.borderRadius.roundedSmall,
        }}
      >
        {props.text}
      </Text>
    </Pressable>
  )
}
