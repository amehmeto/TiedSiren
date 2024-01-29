import { Pressable, Text } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import uuid from 'react-native-uuid'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { BlocklistsStackScreens } from '../../navigators/screen-lists/BlocklistsStackScreens'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

function BlocklistCard(props: {
  blocklistName: string
  blocksNumber: number
  onPress: () => any
}) {
  return (
    <Pressable onPress={props.onPress}>
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
    </Pressable>
  )
}

export function BlocklistScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  const blocklists: [string, string, number][] = [
    [String(uuid.v4()), 'Distractions', 397],
    [String(uuid.v4()), 'Necessary evils', 4],
  ]

  return (
    <TiedSLinearBackground>
      {blocklists.map(([id, blocklistName, blocksNumber]) => (
        <BlocklistCard
          key={id}
          blocklistName={blocklistName}
          blocksNumber={blocksNumber}
          onPress={() =>
            navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
          }
        />
      ))}
    </TiedSLinearBackground>
  )
}
