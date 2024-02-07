import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { HomeStackScreens } from '../../navigators/screen-lists/HomeStackScreens'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Formik } from 'formik'
import { T } from '../../design-system/theme'
import { SelectFromList } from './SelectFromList'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

export function CreateBlockSessionScreen({
  navigation,
}: Readonly<HomeScreenProps>) {
  const sessionOptions = {
    blocklists: ['Distractions'],
    devices: ['Huawei P20, Lenovo Tab'],
    start: '19:00',
    end: '21:00',
    name: 'Working time',
  }
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <TiedSLinearBackground>
      <SelectFromList
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
        onPress={() => {
          setModalVisible(!modalVisible)
        }}
      />

      <Formik
        initialValues={sessionOptions}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TiedSBlurView style={styles.blockSession}>
              <View style={styles.container}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>

              <View style={styles.container}>
                <Text style={styles.label}>Blocklists</Text>
                <Pressable
                  onPress={() => {
                    setModalVisible(true)
                  }}
                >
                  <TextInput
                    style={styles.option}
                    onChangeText={handleChange('blocklists')}
                    onBlur={handleBlur('blocklists')}
                    value={values.blocklists.join(', ')}
                  />
                </Pressable>
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Devices</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('devices')}
                  onBlur={handleBlur('devices')}
                  value={values.devices.join(', ')}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Starts</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('start')}
                  onBlur={handleBlur('start')}
                  value={values.start}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.label}>Ends</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('end')}
                  onBlur={handleBlur('end')}
                  value={values.end}
                />
              </View>
            </TiedSBlurView>
            <TiedSButton
              text={'START'}
              onPress={() => {
                handleSubmit()
                navigation.navigate(HomeStackScreens.MAIN_HOME)
              }}
            />
          </View>
        )}
      </Formik>
    </TiedSLinearBackground>
  )
}

const styles = StyleSheet.create({
  blockSession: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  container: {
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
