import React, { useState } from 'react'
import { FormikProps } from 'formik'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { T } from '../../design-system/theme'
import { Session } from './CreateBlockSessionScreen'
import { HomeStackScreens } from '../../navigators/screen-lists/HomeStackScreens'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { SelectFromList } from './SelectFromList'
import { blocklistRepository, deviceRepository } from '../../dependencies'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export function SelectBlockSessionParams(
  props: Readonly<{
    form: FormikProps<Session>
    navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
  }>,
) {
  const { handleChange, handleBlur, handleSubmit, setFieldValue, values } =
    props.form

  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(false)

  return (
    <View>
      <TiedSBlurView style={styles.blockSession}>
        <View style={styles.param}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.option}
            onChangeText={() => handleChange('name')}
            onBlur={() => handleBlur('name')}
            value={values.name ?? 'Choose a name...'}
          />
        </View>

        <SelectFromList
          values={values}
          listType={'blocklists'}
          setFieldValue={setFieldValue}
          getItems={() => blocklistRepository.getBlocklists()}
        />
        <SelectFromList
          values={values}
          listType={'devices'}
          setFieldValue={setFieldValue}
          getItems={() => deviceRepository.getDevices()}
        />

        <View style={styles.param}>
          <Text style={styles.label}>Starts</Text>
          <Pressable onPress={() => setIsDatePickerVisible(true)}>
            <Text style={styles.option}>
              {values.start ?? 'Select start time...'}
            </Text>
          </Pressable>
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            is24Hour={true}
            mode="time"
            onConfirm={(date) => {
              setIsDatePickerVisible(false)
              setFieldValue('start', date.toTimeString()).then((r) =>
                console.log('start', r),
              )
            }}
            onCancel={() => setIsDatePickerVisible(false)}
          />
        </View>

        <View style={styles.param}>
          <Text style={styles.label}>Ends</Text>
          <Pressable onPress={() => setIsDatePickerVisible(true)}>
            <Text style={styles.option}>
              {values.end ?? 'Select end time...'}
            </Text>
          </Pressable>
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            is24Hour={true}
            mode="time"
            onConfirm={(date) => {
              setIsDatePickerVisible(false)
              setFieldValue('end', date.toTimeString()).then((r) =>
                console.log('end', r),
              )
            }}
            onCancel={() => setIsDatePickerVisible(false)}
          />
        </View>
      </TiedSBlurView>
      <TiedSButton
        text={'START'}
        onPress={() => {
          handleSubmit()
          props.navigation.navigate(HomeStackScreens.MAIN_HOME)
        }}
      />
    </View>
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
