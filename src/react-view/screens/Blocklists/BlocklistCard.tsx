import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { ThreeDotMenu } from './ThreeDotMenu.tsx'

export function BlocklistCard(
  props: Readonly<{
    blocklist: {
      id: string
      name: string
      totalBlocks: string
    }
    onPress: () => void
  }>,
) {
  return (
    <Pressable onPress={props.onPress}>
      <TiedSBlurView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{props.blocklist.name}</Text>
          <Text style={styles.totalBlocks}>{props.blocklist.totalBlocks}</Text>
        </View>
        <ThreeDotMenu />
      </TiedSBlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },
})
