import React from 'react'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../design-system/theme'
import { Pressable, Text, View } from 'react-native'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons'
import { Icon } from '@expo/vector-icons/build/createIconSet'
import { BlocklistsStackScreens } from '../../navigators/screen-lists/BlocklistsStackScreens'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

function BlocksPreviewCard(props: {
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
          style={{ marginRight: T.spacing.small }}
        />
        <View
          style={{
            flexDirection: 'column' as const,
            alignItems: 'stretch' as const,
          }}
        >
          <Text style={{ color: T.color.text }}>
            {props.blocksNumber} blocks
          </Text>
          <Text style={{ color: T.color.text, fontSize: T.size.xSmall }}>
            {props.platform}
          </Text>
        </View>
      </TiedSBlurView>
    </Pressable>
  )
}

export function EditBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const titleStyle = {
    fontWeight: T.fontWeight.bold,
    color: T.color.text,
    fontFamily: T.fontFamily.primary,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  }

  const blocklist = {
    name: 'Distractions',
    androidBlock: 19,
    iosBlock: 14,
    macosBlock: 6,
    windowsBlock: 10,
    linuxBlock: 8,
    webBlock: 343,
  }

  return (
    <TiedSLinearBackground>
      <Text style={titleStyle}>Name</Text>
      <TiedSBlurView>
        <Text style={{ color: T.color.text }}>{blocklist.name}</Text>
      </TiedSBlurView>

      <Text style={titleStyle}>Blocked Mobile Applications</Text>
      <BlocksPreviewCard
        IconTag={Zocial}
        iconName={'android'}
        platform={'Android'}
        blocksNumber={blocklist.androidBlock}
        onPress={() => {
          console.log('Android called')
          navigation.navigate(BlocklistsStackScreens.EDIT_PLATFORM_BLOCKLIST)
        }}
      />

      <BlocksPreviewCard
        IconTag={MaterialCommunityIcons}
        iconName={'apple-ios'}
        platform={'iOS'}
        blocksNumber={blocklist.iosBlock}
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
        }
      />

      <Text style={titleStyle}>Blocked Desktop Applications</Text>
      <BlocksPreviewCard
        IconTag={MaterialCommunityIcons}
        iconName={'apple'}
        platform={'macOS'}
        blocksNumber={blocklist.macosBlock}
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
        }
      />
      <BlocksPreviewCard
        IconTag={MaterialCommunityIcons}
        iconName={'microsoft-windows'}
        platform={'Windows'}
        blocksNumber={blocklist.windowsBlock}
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
        }
      />

      <BlocksPreviewCard
        IconTag={MaterialCommunityIcons}
        iconName={'linux'}
        platform={'Linux'}
        blocksNumber={blocklist.linuxBlock}
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
        }
      />

      <Text style={titleStyle}>Websites</Text>
      <BlocksPreviewCard
        IconTag={MaterialCommunityIcons}
        iconName={'web'}
        platform={'web'}
        blocksNumber={blocklist.webBlock}
        onPress={() =>
          navigation.navigate(BlocklistsStackScreens.EDIT_BLOCKLIST)
        }
      />

      <Text style={titleStyle}>Curated Filters</Text>
    </TiedSLinearBackground>
  )
}
