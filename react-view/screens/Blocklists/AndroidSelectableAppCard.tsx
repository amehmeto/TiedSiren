import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { CheckBox } from 'react-native-elements'
import { InstalledApp } from '../../../core/installed-app/InstalledApp'

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
    <Pressable onPress={onPress}>
      <TiedSBlurView style={styles.container}>
        <Image
          source={{
            uri: dataImagePngBase64 + app.icon,
          }}
          style={styles.appIcon}
        />
        <Text style={styles.appName}>{app.appName}</Text>
        <CheckBox
          style={styles.checkbox}
          containerStyle={styles.checkbox.container}
          checked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
          checkedColor={T.color.lightBlue}
        />
      </TiedSBlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'flex-end',
    container: {
      padding: 0,
      margin: 0,
    },
  },
  appName: {
    color: T.color.text,
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  appIcon: {
    marginRight: T.spacing.small,
    height: 20,
    width: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
