import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../../design-system/theme.ts'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { BlocklistsStackScreens } from '../../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { Ionicons } from '@expo/vector-icons'
import { BlocklistCard } from '../BlocklistCard.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../core/_redux_/createStore.ts'
import { selectBlocklistViewModel } from './blocklist.view-model.ts'
import * as React from 'react'
import { ReactNode } from 'react'
import { exhaustiveGuard } from '../../../../common/exhaustive-guard.ts'
import { BlocklistViewModel } from './blocklist-view-model.type.ts'

type BlockListScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function BlocklistScreen({
  navigation,
}: Readonly<BlockListScreenProps>) {
  const viewModel = useSelector<
    RootState,
    ReturnType<typeof selectBlocklistViewModel>
  >((rootState) => selectBlocklistViewModel(rootState))

  const blocklistsNode: ReactNode = (() => {
    switch (viewModel.type) {
      case BlocklistViewModel.NoBlocklist:
        return (
          <View>
            <Text style={{ color: 'white' }}>{viewModel.message}</Text>
          </View>
        )
      case BlocklistViewModel.WithBlockLists:
        return (
          <FlatList
            data={viewModel.blocklists}
            keyExtractor={(blocklist) => blocklist.id}
            renderItem={({ item: blocklist }) => (
              <BlocklistCard
                blocklist={blocklist}
                onPress={() =>
                  navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST, {
                    blocklistId: blocklist.id,
                  })
                }
              />
            )}
          />
        )
      default:
        return exhaustiveGuard(viewModel)
    }
  })()

  return (
    <TiedSLinearBackground>
      {blocklistsNode}
      <Pressable
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.CREATE_BLOCK_LIST)
        }
        style={styles.roundButton}
      >
        <Ionicons
          name={'add'}
          size={T.addButtonSize}
          color={T.color.lightBlue}
        />
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
