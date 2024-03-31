import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { ThreeDotMenu } from '../../design-system/components/ThreeDotMenu.tsx'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../navigators/screen-lists/TabScreens.ts'
import { BlocklistsStackScreens } from '../../navigators/screen-lists/BlocklistsStackScreens.ts'

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
  const blocklistCardMenu = [
    {
      name: 'Rename',
      iconName: 'text-outline' as const,
      action: () => {},
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
      action: () => {},
    },
    {
      name: 'Delete',
      iconName: 'trash-outline' as const,
      action: () => {},
    },
  ]

  return (
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
          <Text style={styles.totalBlocks}>{props.blocklist.totalBlocks}</Text>
        </View>
        <ThreeDotMenu
          menuOptions={blocklistCardMenu}
          navigation={props.navigation}
        />
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
