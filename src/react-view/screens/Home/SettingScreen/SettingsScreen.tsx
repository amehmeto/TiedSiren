import { Text, View } from 'react-native'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'

/*type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, 'Settings'>
}*/

export function SettingsScreen() {
  return (
    <TiedSLinearBackground>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Settings</Text>
      </View>
    </TiedSLinearBackground>
  )
}
