import { Session } from './CreateBlockSessionScreen.tsx'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { T } from '../../../design-system/theme.ts'
import React from 'react'

function WebTimePicker(
  props: Readonly<{
    value: string
    onChange: (event: any) => void
    onClick: () => void
  }>,
) {
  return (
    <View style={styles.webTimePicker}>
      <input
        aria-label={'Time'}
        type={'time'}
        value={props.value}
        onChange={props.onChange}
      />
      <button onClick={props.onClick}>Confirm</button>
    </View>
  )
}

export function SelectTime(
  props: Readonly<{
    timeField: 'start' | 'end'
    setIsTimePickerVisible: (value: React.SetStateAction<boolean>) => void
    values: Session
    isTimePickerVisible: boolean
    setFieldValue: (field: string, value: string) => void
  }>,
) {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const formattedTime = `${hours}:${minutes}`

  return (
    <>
      <View style={styles.param}>
        <Text style={styles.label}>{props.timeField}</Text>
        <Pressable onPress={() => props.setIsTimePickerVisible(true)}>
          <Text style={styles.option}>
            {props.timeField === 'start'
              ? props.values.start ?? `Select start time...`
              : props.values.end ?? `Select end time...`}
          </Text>
        </Pressable>
      </View>
      <View>
        {Platform.OS === 'web' ? (
          props.isTimePickerVisible && (
            <WebTimePicker
              value={formattedTime}
              onChange={(event) => {
                const [hours, minutes] = event.target.value.split(':')
                const date = new Date()
                date.setHours(parseInt(hours))
                date.setMinutes(parseInt(minutes))
                props.setFieldValue(props.timeField, date.toTimeString())
              }}
              onClick={() => props.setIsTimePickerVisible(false)}
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
  webTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
