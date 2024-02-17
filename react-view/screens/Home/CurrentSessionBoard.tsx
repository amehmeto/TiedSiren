import { StyleSheet, Text, View } from 'react-native'
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

export function CurrentSessionBoard(
  props: Readonly<{
    session: {
      name: string
      minutesLeft: number
      blocklists: number
      devices: number
    }
  }>,
) {
  return (
    <TiedSBlurView>
      <RoundBlueDot />
      <View>
        <Text style={styles.sessionName}>{props.session.name}</Text>
        <Text style={styles.minutesLeft}>
          {props.session.minutesLeft} minutes left
        </Text>
        <Text style={styles.devices}>
          {props.session.devices} device, {props.session.blocklists} blocklist
        </Text>
      </View>
    </TiedSBlurView>
  )
}

const styles = StyleSheet.create({
  sessionName: { color: T.color.text, fontWeight: T.font.weight.bold },
  minutesLeft: { color: T.color.lightBlue, fontWeight: T.font.weight.bold },
  devices: { color: T.color.text },
})
