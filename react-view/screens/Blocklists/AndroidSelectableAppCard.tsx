import { InstalledApp } from '../../../core/installed-apps/InstalledApp'
import React, { useState } from 'react'
import { Image, Pressable, Text } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { CheckBox } from 'react-native-elements'

export function AndroidSelectableAppCard({
  app,
  onPress,
}: {
  app: InstalledApp
  onPress: () => any
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const dataImagePngBase64 = 'data:image/png;base64,'

  return (
    <Pressable onPress={onPress} style={{ padding: 0 }}>
      <TiedSBlurView style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{
            uri: dataImagePngBase64 + app.icon,
          }}
          style={{ marginRight: T.spacing.small, height: 20, width: 20 }}
        />
        <Text
          style={{ color: T.color.text, flexGrow: 1, alignItems: 'flex-end' }}
        >
          {app.appName}
        </Text>
        <CheckBox
          style={{ alignItems: 'flex-end' }}
          containerStyle={{ padding: 0, margin: 0 }}
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
      </TiedSBlurView>
    </Pressable>
  )
}
