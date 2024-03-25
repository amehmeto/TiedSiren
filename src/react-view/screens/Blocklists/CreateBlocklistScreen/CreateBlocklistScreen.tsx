import { Dimensions, StyleSheet, Text } from 'react-native'
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
import { Route, SceneMap, TabBarProps, TabView } from 'react-native-tab-view'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'
import { BlocklistsStackScreens } from '../../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { ChooseBlockTabBar } from './ChooseBlockTabBar.tsx'
import { useDispatch } from 'react-redux'
import { createBlocklist } from '../../../../core/blocklist/usecases/create-blocklist.usecase.ts'
import { AppDispatch } from '../../../../core/_redux_/createStore.ts'
import {
  Blocklist,
  Sirens,
  SirenType,
} from '../../../../core/blocklist/blocklist.ts'
import { AppsSelectionScene } from './AppsSelectionScene.tsx'
import { TextInputSelectionScene } from './TextInputSelectionScene.tsx'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function CreateBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const dispatch = useDispatch<AppDispatch>()

  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([])
  const [websites, setWebsites] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])

  const [blocklist, setBlocklist] = useState<Omit<Blocklist, 'id'>>({
    name: '',
    sirens: {
      android: [],
      ios: [],
      windows: [],
      macos: [],
      linux: [],
      websites: [],
      keywords: [],
    },
  })
  const [index, setIndex] = useState(0)
  const routes = [
    { key: 'apps', title: 'Apps' },
    { key: 'websites', title: 'Websites' },
    { key: 'keywords', title: 'Keywords' },
  ]

  useEffect(() => {
    installedAppsRepository.getInstalledApps().then((apps) => {
      setInstalledApps(apps)
    })
  }, [])

  function toggleSiren(sirenType: keyof Sirens, sirenId: string) {
    setBlocklist((prevBlocklist) => {
      const updatedSirens = { ...prevBlocklist.sirens }

      updatedSirens[sirenType] = updatedSirens[sirenType].includes(sirenId)
        ? updatedSirens[sirenType].filter(
            (selectedSiren) => selectedSiren !== sirenId,
          )
        : [...updatedSirens[sirenType], sirenId]

      return {
        ...prevBlocklist,
        sirens: updatedSirens,
      }
    })
  }

  function isSirenSelected(sirenType: SirenType, sirenId: string) {
    return blocklist.sirens[sirenType].includes(sirenId)
  }

  const renderScene = SceneMap({
    apps: () => (
      <AppsSelectionScene
        data={installedApps}
        toggleSiren={toggleSiren}
        isSirenSelected={isSirenSelected}
      />
    ),
    websites: () => (
      <TextInputSelectionScene
        onSubmitEditing={(event) =>
          setWebsites([...websites, event.nativeEvent.text])
        }
        sirenType={SirenType.WEBSITES}
        placeholder={'Add websites...'}
        data={websites}
        toggleSiren={toggleSiren}
        isSirenSelected={isSirenSelected}
      />
    ),
    keywords: () => (
      <TextInputSelectionScene
        onSubmitEditing={(event) =>
          setKeywords([...keywords, event.nativeEvent.text])
        }
        sirenType={SirenType.KEYWORDS}
        placeholder={'Add keywords...'}
        data={keywords}
        toggleSiren={toggleSiren}
        isSirenSelected={isSirenSelected}
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
        lazy={false}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props: TabBarProps<Route>) => (
          <ChooseBlockTabBar {...props} />
        )}
      />

      <TiedSButton
        text={'Save Blocklist'}
        onPress={() => {
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
