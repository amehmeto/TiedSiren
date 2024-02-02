import { Text, View } from 'react-native'
import React from 'react'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'

function RoundBlueDot() {
  const roundSize = 15

  return (
    <View
      style={{
        margin: T.spacing.small,
        marginRight: T.spacing.x_large,
        width: roundSize,
        height: roundSize,
        borderRadius: roundSize / 2,
        backgroundColor: T.color.lightBlue,
      }}
    ></View>
  )
}

export function CurrentSessionBoard(props: {
  session: {
    name: string
    minutesLeft: number
    blocklists: number
    devices: number
  }
}) {
  return (
    <TiedSBlurView>
      <RoundBlueDot />
      <View>
        <Text style={{ color: T.color.text, fontWeight: T.fontWeight.bold }}>
          {props.session.name}
        </Text>
        <Text
          style={{ color: T.color.lightBlue, fontWeight: T.fontWeight.bold }}
        >
          {props.session.minutesLeft} minutes left
        </Text>
        <Text style={{ color: T.color.text }}>
          {props.session.devices} device, {props.session.blocklists} blocklist
        </Text>
      </View>
    </TiedSBlurView>
  )
}
