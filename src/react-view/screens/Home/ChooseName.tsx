import { Session } from './CreateBlockSessionScreen'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSModal } from '../../design-system/components/TiedSModal'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { T } from '../../design-system/theme'
import { TiedSTextInput } from '../../design-system/components/TiedSTextInput'

export function ChooseName(
  props: Readonly<{
    values: Session
    onChangeText: (text: string) => void
    onBlur: () => (e: React.FocusEvent) => void
  }>,
) {
  const [isNameModalVisible, setIsNameModalVisible] = useState<boolean>(false)

  return (
    <>
      <View style={styles.param}>
        <Text style={styles.label}>Name</Text>
        <Pressable onPress={() => setIsNameModalVisible(true)}>
          <Text style={styles.option}>
            {props.values.name ?? 'Choose a name...'}
          </Text>
        </Pressable>
      </View>
      <TiedSModal
        isVisible={isNameModalVisible}
        onRequestClose={() => setIsNameModalVisible(false)}
        style={{ flexDirection: 'column' }}
      >
        <TiedSTextInput
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          value={props.values.name ?? 'Choose a name...'}
          selectTextOnFocus={true}
        />
        <TiedSButton
          text={'SAVE'}
          onPress={() => setIsNameModalVisible(false)}
        />
      </TiedSModal>
    </>
  )
}

const styles = StyleSheet.create({
  param: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: T.spacing.medium,
    paddingBottom: T.spacing.medium,
    paddingLeft: T.spacing.small,
    paddingRight: T.spacing.small,
  },
  label: {
    color: T.color.text,
  },
  option: {
    color: T.color.lightBlue,
    textAlign: 'right',
  },
})
