import { Blocklist } from '../../../core/blocklist/blocklist'
import { Pressable, StyleSheet, Text } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import React from 'react'

export function BlocklistCard(props: {
  blocklist: Blocklist
  onPress: () => any
}) {
  return (
    <Pressable onPress={props.onPress}>
      <TiedSBlurView style={styles.container}>
        <Text style={styles.name}>{props.blocklist.name}</Text>
        <Text style={styles.totalBlocks}>
          {props.blocklist.totalBlocks} blocks
        </Text>
      </TiedSBlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  name: {
    color: T.color.text,
    fontWeight: T.fontWeight.bold,
    paddingBottom: T.spacing.extraSmall,
  },
  totalBlocks: {
    color: T.color.text,
    fontSize: T.size.xSmall,
  },
})
