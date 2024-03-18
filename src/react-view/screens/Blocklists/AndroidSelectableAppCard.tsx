import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import { CheckBox } from 'react-native-elements'
import { InstalledApp } from '../../../core/installed-app/InstalledApp'

export function AndroidSelectableAppCard({
  app,
  onPress,
  isSelected,
}: Readonly<{
  app: InstalledApp
  onPress: () => void
  isSelected: boolean
}>) {
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
          containerStyle={styles.checkboxContainer}
          checked={isSelected}
          checkedColor={T.color.lightBlue}
          onPress={onPress}
        />
      </TiedSBlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignItems: 'flex-end',
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
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
})
