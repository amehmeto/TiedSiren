import React from 'react'
import { StyleSheet, View } from 'react-native'

export function WebTimePicker(
  props: Readonly<{
    value: string
    setTime: (chosenTime: string) => void
    handleChange: (field: string) => void
    setIsTimePickerVisible: (value: React.SetStateAction<boolean>) => void
  }>,
) {
  return (
    <View style={styles.webTimePicker}>
      <input
        aria-label={'Time'}
        type={'time'}
        value={props.value}
        onChange={(event) => {
          props.handleChange(event.target.value)
          props.setTime(event.target.value)
          props.setIsTimePickerVisible(true)
        }}
      />
      <button
        onClick={() => {
          props.setTime(props.value)
          props.setIsTimePickerVisible(false)
        }}
      >
        Confirm
      </button>
    </View>
  )
}

const styles = StyleSheet.create({
  webTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
