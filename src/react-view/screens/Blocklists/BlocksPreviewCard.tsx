import { IconProps } from '@expo/vector-icons/build/createIconSet'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import React from 'react'

export function BlocksPreviewCard(
  props: Readonly<{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    IconTag: React.ComponentType<IconProps<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
    iconName: string
    platform: 'Android' | 'iOS' | 'web' | 'macOS' | 'Windows' | 'Linux'
    blocksNumber: number
    onPress: () => void
  }>,
) {
  return (
    <TouchableOpacity onPress={props.onPress}>
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
    </TouchableOpacity>
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
