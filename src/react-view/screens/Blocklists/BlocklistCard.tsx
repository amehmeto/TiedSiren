import { Blocklist } from '../../../core/blocklist/blocklist'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'

export function BlocklistCard(
  props: Readonly<{
    blocklist: Blocklist
    onPress: () => void
  }>,
) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <TiedSBlurView style={styles.container}>
        <Text style={styles.name}>{props.blocklist.name}</Text>
        <Text style={styles.totalBlocks}>
          {props.blocklist.totalBlocks} blocks
        </Text>
      </TiedSBlurView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  name: {
    color: T.color.text,
    fontWeight: T.font.weight.bold,
    paddingBottom: T.spacing.extraSmall,
  },
  totalBlocks: {
    color: T.color.text,
    fontSize: T.size.xSmall,
  },
})