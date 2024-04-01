import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { ThreeDotMenu } from '../../design-system/components/ThreeDotMenu.tsx'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../navigators/screen-lists/TabScreens.ts'
import { BlocklistsStackScreens } from '../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { renameBlocklist } from '../../../core/blocklist/usecases/rename-blocklist.usecase.ts'
import { AppDispatch } from '../../../core/_redux_/createStore.ts'
import { TextInputModal } from './TextInputModal.tsx'
import { duplicateBlocklist } from '../../../core/blocklist/usecases/duplicate-blocklist.usecase.ts'

export function BlocklistCard(
  props: Readonly<{
    blocklist: {
      id: string
      name: string
      totalBlocks: string
    }
    navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
  }>,
) {
  const dispatch = useDispatch<AppDispatch>()

  const [isRenameModalVisible, setRenameModalVisible] = useState(false)
  const [isDuplicateModalVisible, setIsDuplicateModalVisible] = useState(false)

  const blocklistCardMenu = [
    {
      name: 'Rename',
      iconName: 'text-outline' as const,
      action: () => {
        setRenameModalVisible(true)
      },
    },
    {
      name: 'Edit',
      iconName: 'create-outline' as const,
      action: () =>
        props.navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST, {
          blocklistId: props.blocklist.id,
        }),
    },
    {
      name: 'Duplicate',
      iconName: 'copy-outline' as const,
      action: () => {
        setIsDuplicateModalVisible(true)
      },
    },
    {
      name: 'Delete',
      iconName: 'trash-outline' as const,
      action: () => {},
    },
  ]

  return (
    <>
      <Pressable
        onPress={() =>
          props.navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST, {
            blocklistId: props.blocklist.id,
          })
        }
      >
        <TiedSBlurView style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{props.blocklist.name}</Text>
            <Text style={styles.totalBlocks}>
              {props.blocklist.totalBlocks}
            </Text>
          </View>
          <ThreeDotMenu
            menuOptions={blocklistCardMenu}
            navigation={props.navigation}
          />
        </TiedSBlurView>
      </Pressable>

      <TextInputModal
        visible={isRenameModalVisible}
        label={'Rename blocklist'}
        initialText={props.blocklist.name}
        onRequestClose={() => {
          setRenameModalVisible(false)
        }}
        onCancel={() => {
          setRenameModalVisible(false)
        }}
        onSave={(inputText: string) => {
          dispatch(renameBlocklist({ id: props.blocklist.id, name: inputText }))
          setRenameModalVisible(false)
        }}
      />
      <TextInputModal
        visible={isDuplicateModalVisible}
        label={'Choose the name of the duplicated list blocklist'}
        initialText={'Copy of "' + props.blocklist.name + '"'}
        onRequestClose={() => {
          setIsDuplicateModalVisible(false)
        }}
        onCancel={() => {
          setIsDuplicateModalVisible(false)
        }}
        onSave={(inputText: string) => {
          dispatch(
            duplicateBlocklist({ id: props.blocklist.id, name: inputText }),
          )
          setIsDuplicateModalVisible(false)
        }}
      />
    </>
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
