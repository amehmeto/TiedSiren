import { Modal, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { T } from '../../design-system/theme'
import React from 'react'
import { TiedSButton } from '../../design-system/components/TiedSButton'

export function SelectFromList(
  props: Readonly<{
    visible: boolean
    onRequestClose: () => void
    onPress: () => void
  }>,
) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.centeredView}>
        <TiedSBlurView style={styles.modalView}>
          <View>
            <Text style={{ color: T.color.text }}>Hello, I am a Modal!</Text>
            <TiedSButton onPress={props.onRequestClose} text={'SAVE'} />
          </View>
        </TiedSBlurView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
