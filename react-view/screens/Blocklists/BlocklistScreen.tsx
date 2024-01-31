import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import uuid from 'react-native-uuid'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { BlocklistsStackScreens } from '../../navigators/screen-lists/BlocklistsStackScreens'
import { Ionicons } from '@expo/vector-icons'
import { Blocklist } from '../../../core/blocklist/blocklist'
import { BlocklistCard } from './BlocklistCard'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function BlocklistScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  const blocklists: Blocklist[] = [
    {
      id: String(uuid.v4()),
      name: 'Distractions',
      totalBlocks: 397,
    },
    {
      id: String(uuid.v4()),
      name: 'Necessary evils',
      totalBlocks: 4,
    },
  ]

  return (
    <TiedSLinearBackground>
      <FlatList
        data={blocklists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlocklistCard
            blocklist={item}
            onPress={() =>
              navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
            }
          />
        )}
      />
      <TouchableOpacity onPress={() => {}} style={styles.roundButton}>
        <Ionicons name={'add'} size={50} color={T.color.lightBlue} />
      </TouchableOpacity>
    </TiedSLinearBackground>
  )
}

const styles = StyleSheet.create({
  roundButton: {
    width: T.width.roundButton,
    height: T.width.roundButton,
    justifyContent: 'center',
    alignItems: 'center',
    padding: T.spacing.small,
    borderRadius: T.borderRadius.fullRound,

    backgroundColor: T.color.darkBlue,
    shadowColor: T.color.shadow,
    shadowOffset: {
      width: T.shadow.offset.width,
      height: T.shadow.offset.height,
    },
    shadowOpacity: T.shadow.opacity,
    shadowRadius: T.shadow.radius,

    position: 'absolute',
    bottom: T.spacing.large,
    right: T.spacing.large,
  },
})
