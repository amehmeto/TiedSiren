import { Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, 'Settings'>
}
// @ts-ignore
export function SettingsScreen({ navigation }: Readonly<SettingsScreenProps>) {
  return (
    <TiedSLinearBackground>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Settings</Text>
      </View>
    </TiedSLinearBackground>
  )
}
