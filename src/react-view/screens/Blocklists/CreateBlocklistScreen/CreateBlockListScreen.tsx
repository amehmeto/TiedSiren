import { Dimensions, FlatList, Pressable, StyleSheet, Text } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { T } from '../../../design-system/theme'
import { TiedSTextInput } from '../../../design-system/components/TiedSTextInput.tsx'
import { useEffect, useState } from 'react'
import { installedAppsRepository } from '../../../dependencies.ts'
import { InstalledApp } from '../../../../core/installed-app/InstalledApp.ts'
import { AndroidSelectableAppCard } from '../AndroidSelectableAppCard.tsx'
import {
  Route,
  SceneMap,
  TabBar,
  TabBarProps,
  TabView,
} from 'react-native-tab-view'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

const renderTabBar = (props: TabBarProps<Route>) => (
  <TabBar
    {...props}
    indicatorStyle={{ height: 0, display: 'none', width: 0 }}
    renderLabel={({ route, focused, color }) => (
      <Pressable
        style={{
          backgroundColor: focused ? T.color.lightBlue : T.color.darkBlue,
          borderColor: focused ? T.color.lightBlue : T.color.darkBlue,
          borderRadius: T.border.radius.extraRounded,
          padding: T.spacing.medium,
          minWidth: 80,
          margin: 0,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {route.title}
        </Text>
      </Pressable>
    )}
    style={{ backgroundColor: 'transparent' }}
    tabStyle={{ marginLeft: 0, paddingLeft: 0 }}
  />
)

export function CreateBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([])
  const [blocklistName, setBlocklistName] = useState('')
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

  const renderScene = SceneMap({
    apps: () => (
      <FlatList
        data={installedApps}
        keyExtractor={(item) => item.appName}
        renderItem={({ item }) => (
          <AndroidSelectableAppCard app={item} onPress={() => {}} />
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
          onChangeText={(text) => setBlocklistName(text)}
        />
      </TiedSBlurView>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />

      <TiedSButton text={'Save Blocklist'} onPress={() => {}} />
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
