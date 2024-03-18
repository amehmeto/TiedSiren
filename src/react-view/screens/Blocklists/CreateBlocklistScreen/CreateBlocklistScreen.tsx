import { Dimensions, FlatList, StyleSheet, Text } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { T } from '../../../design-system/theme'
import { TiedSTextInput } from '../../../design-system/components/TiedSTextInput.tsx'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { installedAppsRepository } from '../../../dependencies.ts'
import { InstalledApp } from '../../../../core/installed-app/InstalledApp.ts'
import { AndroidSelectableAppCard } from '../AndroidSelectableAppCard.tsx'
import { Route, SceneMap, TabBarProps, TabView } from 'react-native-tab-view'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'
import { BlocklistsStackScreens } from '../../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { ChooseBlockTabBar } from './ChooseBlockTabBar.tsx'
import { useDispatch } from 'react-redux'
import { createBlocklist } from '../../../../core/blocklist/usecases/create-blocklist.usecase.ts'
import { AppDispatch } from '../../../../core/_redux_/createStore.ts'
import { Blocklist } from '../../../../core/blocklist/blocklist.ts'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function CreateBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const dispatch = useDispatch<AppDispatch>()

  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([])
  const [blocklist, setBlocklist] = useState<Omit<Blocklist, 'id'>>({
    name: '',
    blocks: {
      apps: {
        android: [],
      },
      websites: [],
      keywords: [],
    },
  })
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'apps', title: 'Apps' },
    { key: 'websites', title: 'Websites' },
    { key: 'keywords', title: 'Keywords' },
  ])

  useEffect(() => {
    installedAppsRepository.getInstalledApps().then((apps) => {
      setInstalledApps(apps)
    })
  }, [])

  function selectAppToBlocklist(packageName: string) {
    console.log('selectAppToBlocklist', packageName, isAppSelected(packageName))
    setBlocklist((prevBlocklist) => {
      return isAppSelected(packageName)
        ? {
            ...prevBlocklist,
            blocks: {
              ...prevBlocklist.blocks,
              apps: {
                ...prevBlocklist.blocks.apps,
                android: prevBlocklist.blocks.apps.android.filter(
                  (selectedPackageName) => selectedPackageName !== packageName,
                ),
              },
            },
          }
        : {
            ...prevBlocklist,
            blocks: {
              ...prevBlocklist.blocks,
              apps: {
                ...prevBlocklist.blocks.apps,
                android: [...prevBlocklist.blocks.apps.android, packageName],
              },
            },
          }
    })
  }

  function isAppSelected(packageName: string) {
    return blocklist.blocks.apps.android.includes(packageName)
  }

  const renderScene = SceneMap({
    apps: () => (
      <FlatList
        data={installedApps}
        keyExtractor={(item) => item.packageName}
        renderItem={({ item }) => (
          <AndroidSelectableAppCard
            app={item}
            onPress={() => selectAppToBlocklist(item.packageName)}
            isSelected={isAppSelected(item.packageName)}
          />
        )}
      />
    ),
    websites: () => (
      <FlatList
        data={[]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    ),
    keywords: () => (
      <FlatList
        data={[]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    ),
  })

  return (
    <TiedSLinearBackground>
      <Text style={styles.title}>Name</Text>
      <TiedSBlurView>
        <TiedSTextInput
          placeholder="Blocklist name"
          onChangeText={(text) => setBlocklist({ ...blocklist, name: text })}
        />
      </TiedSBlurView>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props: TabBarProps<Route>) => (
          <ChooseBlockTabBar {...props} />
        )}
      />

      <TiedSButton
        text={'Save Blocklist'}
        onPress={() => {
          console.log(blocklist)
          dispatch(createBlocklist(blocklist))
          navigation.navigate(BlocklistsStackScreens.MAIN_BLOCKLIST)
        }}
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
