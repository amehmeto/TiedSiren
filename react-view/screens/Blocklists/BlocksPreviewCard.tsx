import { Icon } from '@expo/vector-icons/build/createIconSet'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import React from 'react'

export function BlocksPreviewCard(props: {
  IconTag: Icon<any, any>
  iconName: string
  platform: 'Android' | 'iOS' | 'web' | 'macOS' | 'Windows' | 'Linux'
  blocksNumber: number
  onPress: () => any
}) {
  return (
    <Pressable onPress={props.onPress}>
      <TiedSBlurView>
        <props.IconTag
          name={props.iconName}
          color={T.color.text}
          size={25}
          style={styles.icon}
        />
        <View style={styles.container}>
          <Text style={styles.blocksNumber}>{props.blocksNumber} blocks</Text>
          <Text style={styles.platform}>{props.platform}</Text>
        </View>
      </TiedSBlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginRight: T.spacing.small,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  blocksNumber: {
    color: T.color.text,
  },
  platform: {
    color: T.color.text,
    fontSize: T.size.xSmall,
  },
})
