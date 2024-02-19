import { useState } from 'react'
import { FormikProps } from 'formik'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { TiedSButton } from '../../../design-system/components/TiedSButton.tsx'
import { T } from '../../../design-system/theme.ts'
import { Session } from './CreateBlockSessionScreen.tsx'
import { HomeStackScreens } from '../../../navigators/screen-lists/HomeStackScreens.ts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { SelectFromList } from './SelectFromList.tsx'
import { blocklistRepository, deviceRepository } from '../../../dependencies.ts'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { ChooseName } from './ChooseName.tsx'

export function SelectBlockSessionParams(
  props: Readonly<{
    form: FormikProps<Session>
    navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
  }>,
) {
  const { handleChange, handleBlur, handleSubmit, setFieldValue, values } =
    props.form

  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState<boolean>(false)
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] =
    useState<boolean>(false)

  return (
    <View>
      <TiedSBlurView style={styles.blockSession}>
        <ChooseName
          values={values}
          onChangeText={(text) => handleChange('name')(text)}
          onBlur={() => handleBlur('name')}
        />

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
          <Pressable onPress={() => setIsStartTimePickerVisible(true)}>
            <Text style={styles.option}>
              {values.start ?? 'Select start time...'}
            </Text>
          </Pressable>
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            is24Hour={true}
            mode="time"
            onConfirm={(date) => {
              setFieldValue('start', date.toTimeString())
              setIsStartTimePickerVisible(false)
            }}
            onCancel={() => setIsStartTimePickerVisible(false)}
          />
        </View>

        <View style={styles.param}>
          <Text style={styles.label}>Ends</Text>
          <Pressable onPress={() => setIsEndTimePickerVisible(true)}>
            <Text style={styles.option}>
              {values.end ?? 'Select end time...'}
            </Text>
          </Pressable>
        </View>
        <View>
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            is24Hour={true}
            mode="time"
            onConfirm={(date) => {
              setFieldValue('end', date.toTimeString())
              setIsEndTimePickerVisible(false)
            }}
            onCancel={() => setIsEndTimePickerVisible(false)}
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
