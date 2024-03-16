import { SectionList, StyleSheet, Text } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { T } from '../../../design-system/theme'
import { TiedSTextInput } from '../../../design-system/components/TiedSTextInput.tsx'
import { useState } from 'react'

type BlocklistScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.BLOCKLIST>
}

export function CreateBlocklistScreen({
  navigation,
}: Readonly<BlocklistScreenProps>) {
  const [blocklistName, setBlocklistName] = useState('')

  return (
    <TiedSLinearBackground>
      <Text style={styles.title}>Name</Text>
      <TiedSBlurView>
        <TiedSTextInput
          placeholder="Blocklist name"
          onChangeText={(text) => setBlocklistName(text)}
        />
        <SectionList sections={[]} />
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
