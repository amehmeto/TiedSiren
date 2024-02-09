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
import { SelectBlocklistModal } from './SelectBlocklistModal'
import { TiedSModal } from '../../design-system/components/TiedSModal'
import { SelectDeviceModal } from './SelectDeviceModal'
import { Blocklist } from '../../../core/blocklist/blocklist'
import { Device } from '../../../core/device/device'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

type Session = {
  name: string
  blocklists: Blocklist[]
  devices: Device[]
  start: string | null
  end: string | null
}
export function CreateBlockSessionScreen({
  navigation,
}: Readonly<HomeScreenProps>) {
  const defaultSession: Session = {
    name: '' as string,
    blocklists: [] as Blocklist[],
    devices: [] as Device[],
    start: null,
    end: null,
  }

  const [isBlocklists, setIsBlocklists] = useState<boolean>(false)
  const [isDeviceList, setIsDeviceList] = useState<boolean>(false)
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)
  const [formResult, setFormResult] = useState({})

  return (
    <TiedSLinearBackground>
      <Formik
        initialValues={defaultSession}
        onSubmit={(values) => {
          setFormResult(values)
          setIsResultModalOpen(true)
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <View>
            <TiedSBlurView style={styles.blockSession}>
              <View style={styles.param}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name === '' ? 'Choose a name...' : values.name}
                />
              </View>

              <View style={styles.param}>
                <Text style={styles.label}>Blocklists</Text>
                <Pressable onPress={() => setIsBlocklists(true)}>
                  <Text style={styles.option}>
                    {values.blocklists.length > 0
                      ? values.blocklists
                          .map((blocklist) => blocklist.name)
                          .join(', ')
                      : 'Choose blocklists...'}
                  </Text>
                </Pressable>
              </View>
              <SelectBlocklistModal
                visible={isBlocklists}
                blocklists={values.blocklists}
                onRequestClose={() => setIsBlocklists(!isBlocklists)}
                onPress={() => setIsBlocklists(!isBlocklists)}
                setFieldValue={setFieldValue}
              />

              <View style={styles.param}>
                <Text style={styles.label}>Devices</Text>
                <Pressable onPress={() => setIsDeviceList(true)}>
                  <Text style={styles.option}>
                    {values.devices.length > 0
                      ? values.devices.map((device) => device.name).join(', ')
                      : 'Choose devices...'}
                  </Text>
                </Pressable>
              </View>
              <SelectDeviceModal
                visible={isDeviceList}
                devices={values.devices}
                onRequestClose={() => setIsDeviceList(!isDeviceList)}
                onPress={() => setIsDeviceList(!isDeviceList)}
                setFieldValue={setFieldValue}
              />

              <View style={styles.param}>
                <Text style={styles.label}>Starts</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('start')}
                  onBlur={handleBlur('start')}
                  value={values.start ?? 'Choose a start time...'}
                />
              </View>
              <View style={styles.param}>
                <Text style={styles.label}>Ends</Text>
                <TextInput
                  style={styles.option}
                  onChangeText={handleChange('end')}
                  onBlur={handleBlur('end')}
                  value={values.end ?? 'Choose an end time...'}
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

      <TiedSModal
        visible={isResultModalOpen}
        onRequestClose={() => setIsResultModalOpen(!isResultModalOpen)}
      >
        <View>
          <Text style={{ color: T.color.text }}>
            {JSON.stringify(formResult, null, 2)}
          </Text>
        </View>
        <TiedSButton
          onPress={() => setIsResultModalOpen(!isResultModalOpen)}
          text={'Close'}
        />
      </TiedSModal>
    </TiedSLinearBackground>
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
