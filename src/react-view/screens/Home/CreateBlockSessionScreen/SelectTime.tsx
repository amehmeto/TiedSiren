import { Session } from './CreateBlockSessionScreen.tsx'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { T } from '../../../design-system/theme.ts'
import React from 'react'
import { WebTimePicker } from './WebTimePicker.tsx'

export function SelectTime(
  props: Readonly<{
    timeField: 'start' | 'end'
    setIsTimePickerVisible: (value: React.SetStateAction<boolean>) => void
    values: Session
    isTimePickerVisible: boolean
    setFieldValue: (field: string, value: string) => void
    handleChange: (field: 'start' | 'end') => void
  }>,
) {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const formattedNowTime = `${hours}:${minutes}`

  function toTimeString(time: string) {
    const [hours, minutes] = time.split(':')
    const date = new Date()
    date.setHours(parseInt(hours))
    date.setMinutes(parseInt(minutes))
    return date.toTimeString().split(' ')[0]
  }

  const chosenTime =
    props.timeField === 'start'
      ? props.values.start ?? formattedNowTime
      : props.values.end ?? formattedNowTime

  const placeholder =
    props.timeField === 'start'
      ? props.values.start ?? `Select start time...`
      : props.values.end ?? `Select end time...`

  return (
    <>
      <View style={styles.param}>
        <Text style={styles.label}>{props.timeField}</Text>
        <Pressable onPress={() => props.setIsTimePickerVisible(true)}>
          <Text style={styles.option}>{placeholder}</Text>
        </Pressable>
      </View>
      <View>
        {Platform.OS === 'web' ? (
          props.isTimePickerVisible && (
            <WebTimePicker
              value={chosenTime}
              handleChange={() => props.handleChange(props.timeField)}
              setTime={(chosenTime: string) => {
                props.setFieldValue(props.timeField, toTimeString(chosenTime))
                props.setIsTimePickerVisible(false)
              }}
            />
          )
        ) : (
          <DateTimePickerModal
            isVisible={props.isTimePickerVisible}
            is24Hour={true}
            mode="time"
            onConfirm={(date) => {
              props.setFieldValue(props.timeField, date.toTimeString())
              props.setIsTimePickerVisible(false)
            }}
            onCancel={() => props.setIsTimePickerVisible(false)}
          />
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  blockSession: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
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
