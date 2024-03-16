import { FlatList, Platform, Pressable, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../../design-system/theme.ts'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { BlocklistsStackScreens } from '../../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { Ionicons } from '@expo/vector-icons'
import { Blocklist } from '../../../../core/blocklist/blocklist.ts'
import { BlocklistCard } from '../BlocklistCard.tsx'
import { blocklistRepository } from '../../../dependencies.ts'
import { useEffect, useState } from 'react'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function BlocklistScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  const [blocklists, setBlocklists] = useState<Blocklist[]>([])

  useEffect(() => {
    blocklistRepository.getBlocklists().then((blocklists) => {
      setBlocklists(blocklists)
    })
  }, [])

  return (
    <TiedSLinearBackground>
      <FlatList
        data={blocklists}
        keyExtractor={(blocklist) => blocklist.id}
        renderItem={({ item: blocklist }) => (
          <BlocklistCard
            blocklist={blocklist}
            onPress={() =>
              navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
            }
          />
        )}
      />
      <Pressable
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.CREATE_BLOCK_LIST)
        }
        style={styles.roundButton}
      >
        <Ionicons name={'add'} size={50} color={T.color.lightBlue} />
      </Pressable>
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
    borderRadius: T.border.radius.fullRound,
    backgroundColor: T.color.darkBlue,
    position: 'absolute',
    bottom: T.spacing.large,
    right: T.spacing.large,

    ...Platform.select({
      ios: {
        shadowColor: T.color.shadow,
        shadowOffset: {
          width: T.shadow.offset.width,
          height: T.shadow.offset.height,
        },
        shadowOpacity: T.shadow.opacity,
        shadowRadius: T.shadow.radius,
      },
      android: {
        elevation: 20,
      },
      web: {
        boxShadow: `5px 5px 10px ${T.color.shadow}`,
      },
    }),
  },
})
