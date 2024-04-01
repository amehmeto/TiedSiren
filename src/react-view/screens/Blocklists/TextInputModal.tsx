import { TiedSModal } from '../../design-system/components/TiedSModal.tsx'
import { TiedSTextInput } from '../../design-system/components/TiedSTextInput.tsx'
import { StyleSheet, View } from 'react-native'
import { TiedSButton } from '../../design-system/components/TiedSButton.tsx'
import { T } from '../../design-system/theme.ts'
import { useState } from 'react'

export function TextInputModal(props: {
  visible: boolean
  label: string
  initialText: string
  onRequestClose: () => void
  onCancel: () => void
  onSave: (inputText: string) => void
}) {
  const [inputText, setInputText] = useState(props.initialText)

  return (
    <TiedSModal
      style={styles.renameModal}
      isVisible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <TiedSTextInput
        label={props.label}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <View style={styles.buttonContainer}>
        <TiedSButton
          style={styles.modalButton}
          onPress={props.onCancel}
          text={'Cancel'}
        />
        <TiedSButton
          style={styles.modalButton}
          onPress={() => {
            props.onSave(inputText)
          }}
          text={'Save'}
        />
      </View>
    </TiedSModal>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalButton: { marginLeft: T.spacing.large },
  renameModal: { flexDirection: 'column' },
})
