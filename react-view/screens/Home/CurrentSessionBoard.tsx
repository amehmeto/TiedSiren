import { BlurView } from 'expo-blur'
import { Text, View } from 'react-native'
import React from 'react'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
function RoundBlueDot() {
  return (
    <View
      style={{
        margin: 10,
        marginRight: 25,
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        backgroundColor: 'rgba(0,212,255,1)',
      }}
    ></View>
  )
}

export function CurrentSessionBoard(props: {
  sessionName: string
  minutesLeft: number
  blocklists: number
  devices: number
}) {
  return (
    <TiedSBlurView>
      <RoundBlueDot />
      <View>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {props.sessionName}
        </Text>
        <Text style={{ color: 'rgba(0,212,255,1)', fontWeight: 'bold' }}>
          {props.minutesLeft} minutes left
        </Text>
        <Text style={{ color: 'white' }}>
          {props.devices} device, {props.blocklists} blocklist
        </Text>
      </View>
    </TiedSBlurView>
  )
}
