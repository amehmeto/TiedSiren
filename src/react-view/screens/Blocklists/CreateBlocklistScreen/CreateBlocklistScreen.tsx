import * as React from 'react'
import { BlocklistForm } from '../shared/BlocklistForm.tsx'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'

export function CreateBlocklistScreen({
  navigation,
}: Readonly<{
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}>) {
  return <BlocklistForm mode="create" navigation={navigation} />
}
