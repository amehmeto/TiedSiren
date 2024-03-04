import { Session } from './CreateBlockSessionScreen.tsx'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSModal } from '../../../design-system/components/TiedSModal.tsx'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'
import { T } from '../../../design-system/theme.ts'
import { TiedSTextInput } from '../../../design-system/components/TiedSTextInput.tsx'

export function ChooseName(
  props: Readonly<{
    values: Session
    onChangeText: (text: string) => void
    onBlur: () => (e: React.FocusEvent) => void
  }>,
) {
  const [isNameModalVisible, setIsNameModalVisible] = useState<boolean>(false)
  const blockSessionName = props.values.name ?? 'Choose a name...'

  return (
    <>
      <View style={styles.param}>
        <Text style={styles.label}>Name</Text>
        <Pressable onPress={() => setIsNameModalVisible(true)}>
          <Text style={styles.option}>{blockSessionName}</Text>
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
          value={blockSessionName}
          autoFocus={true}
          selectTextOnFocus={true}
          selection={{
            start: 0,
            end: blockSessionName.length,
          }}
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
