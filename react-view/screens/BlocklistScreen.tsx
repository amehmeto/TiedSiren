import { Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TiedSLinearBackground } from '../design-system/components/TiedSLinearBackground'
import { TiedSBlurView } from '../design-system/components/TiedSBlurView'
import { T } from '../design-system/theme'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'BlockList'>
}

function BlocklistCard(props: { blocklistName: string; blocksNumber: number }) {
  return (
    <TiedSBlurView
      style={{
        flexDirection: 'column' as const,
        alignItems: 'stretch' as const,
      }}
    >
      <Text
        style={{
          color: T.color.text,
          fontWeight: T.fontWeight.bold,
          paddingBottom: T.spacing.extraSmall,
        }}
      >
        {props.blocklistName}
      </Text>
      <Text style={{ color: T.color.text, fontSize: T.size.xSmall }}>
        {props.blocksNumber} blocks
      </Text>
    </TiedSBlurView>
  )
}

export function BlockListScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  const blocklists: [string, number][] = [
    ['Distractions', 397],
    ['Necessary evils', 4],
  ]

  return (
    <TiedSLinearBackground>
      {blocklists.map(([blocklistName, blocksNumber]) => (
        <BlocklistCard
          blocklistName={blocklistName}
          blocksNumber={blocksNumber}
        />
      ))}
    </TiedSLinearBackground>
  )
}
