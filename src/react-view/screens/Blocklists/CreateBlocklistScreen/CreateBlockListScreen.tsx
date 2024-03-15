import { Text, StyleSheet } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { T } from '../../../design-system/theme'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function CreateBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  return (
    <TiedSLinearBackground>
      <Text style={styles.title}>Name</Text>
      <TiedSBlurView>
        <Text style={{ color: T.color.text }}>Distractions</Text>
      </TiedSBlurView>
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
