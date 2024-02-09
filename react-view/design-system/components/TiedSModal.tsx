import { Modal, StyleSheet, View } from 'react-native'
import { T } from '../theme'
import { TiedSBlurView } from './TiedSBlurView'
import React from 'react'

export function TiedSModal(
  props: Readonly<{
    visible: boolean
    children: React.ReactNode
    onRequestClose: () => void
  }>,
) {
  return (
    <Modal
      style={styles.modalView}
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.centeredView}>
        <TiedSBlurView>{props.children}</TiedSBlurView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: T.spacing.large,
  },
  modalView: {
    margin: T.spacing.large,
    borderRadius: T.borderRadius.extraRounded,
    padding: T.spacing.xx_large,
    alignItems: 'center',
    shadowColor: T.shadow.color,
    shadowOffset: {
      width: T.shadow.offset.width,
      height: T.shadow.offset.height,
    },
    shadowOpacity: T.shadow.opacity,
    shadowRadius: T.shadow.radius,
    elevation: 5,
  },
})
