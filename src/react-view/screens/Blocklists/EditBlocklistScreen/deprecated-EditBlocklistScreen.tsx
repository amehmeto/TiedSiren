import React from 'react'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { T } from '../../../design-system/theme.ts'
import { SectionList, StyleSheet, Text } from 'react-native'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { MaterialCommunityIcons, Zocial } from '@expo/vector-icons'
import { BlocklistsStackScreens } from '../../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { BlocksPreviewCard } from './BlocksPreviewCard.tsx'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export type Platform = 'Android' | 'iOS' | 'web' | 'macOS' | 'Windows' | 'Linux'

type AppBlock = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  IconTag: React.ComponentType<IconProps<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
  iconName: string
  platform: Platform
  blocksNumber: number
}

type Section = {
  title: string
  data: AppBlock[]
}

export function DeprecatedEditBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const platforms: Section[] = [
    {
      title: 'Blocked Mobile Applications',
      data: [
        {
          IconTag: Zocial,
          iconName: 'android',
          platform: 'Android' as const,
          blocksNumber: 19,
        },
        {
          IconTag: MaterialCommunityIcons,
          iconName: 'apple-ios',
          platform: 'iOS' as const,
          blocksNumber: 14,
        },
      ],
    },
    {
      title: 'Blocked Desktop Applications',
      data: [
        {
          IconTag: MaterialCommunityIcons,
          iconName: 'apple',
          platform: 'macOS' as const,
          blocksNumber: 23,
        },
        {
          IconTag: MaterialCommunityIcons,
          iconName: 'microsoft-windows',
          platform: 'Windows' as const,
          blocksNumber: 6,
        },
        {
          IconTag: MaterialCommunityIcons,
          iconName: 'linux',
          platform: 'Linux' as const,
          blocksNumber: 34,
        },
      ],
    },
    {
      title: 'Websites',
      data: [
        {
          IconTag: MaterialCommunityIcons,
          iconName: 'web',
          platform: 'web' as const,
          blocksNumber: 432,
        },
      ],
    },
    { title: 'Curated Filters', data: [] },
    { title: 'Keywords', data: [] },
  ]

  return (
    <TiedSLinearBackground>
      <Text style={styles.title}>Name</Text>
      <TiedSBlurView>
        <Text style={{ color: T.color.text }}>Distractions</Text>
      </TiedSBlurView>

      <SectionList
        sections={platforms}
        keyExtractor={(item, index) => item.platform + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <BlocksPreviewCard
            IconTag={item.IconTag}
            iconName={item.iconName}
            platform={item.platform}
            blocksNumber={item.blocksNumber}
            onPress={() => {
              navigation.navigate(
                BlocklistsStackScreens.EDIT_PLATFORM_BLOCKLIST,
              )
            }}
          />
        )}
      />
    </TiedSLinearBackground>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: T.font.weight.bold,
    color: T.color.text,
    fontFamily: T.font.family.primary,
    fontSize: T.size.small,
    marginTop: T.spacing.small,
    marginBottom: T.spacing.small,
  },
})
