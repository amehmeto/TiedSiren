import * as React from 'react'
import { BlocklistForm } from '../shared/BlocklistForm.tsx'
import { RouteProp } from '@react-navigation/native'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { BlocklistsStackScreens } from '../../../navigators/screen-lists/BlocklistsStackScreens.ts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'

export type EditBlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
  route: RouteProp<ScreenList, BlocklistsStackScreens.EDIT_BLOCKLIST>
}

export function EditBlocklistScreen({
  navigation,
  route,
}: Readonly<EditBlocklistScreenProps>) {
  if (!route || !navigation) return null
  return (
    <BlocklistForm
      mode="edit"
      navigation={navigation}
      blocklistId={route?.params.blocklistId}
    />
  )
}
