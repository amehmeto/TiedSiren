import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSLinearBackground } from '../../design-system/components/TiedSLinearBackground'
import { ScreenList } from '../../navigators/screen-lists/screenLists'
import { TabScreens } from '../../navigators/screen-lists/TabScreens'
import { Text, View } from 'react-native'
import { Formik } from 'formik'
import { T } from '../../design-system/theme'
import { TiedSModal } from '../../design-system/components/TiedSModal'
import { Blocklist } from '../../../core/blocklist/blocklist'
import { Device } from '../../../core/device/device'
import { SelectBlockSessionParams } from './SelectBlockSessionParams'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

export type Session = {
  name: string | null
  blocklists: Blocklist[]
  devices: Device[]
  start: string | null
  end: string | null
}

export function CreateBlockSessionScreen({
  navigation,
}: Readonly<HomeScreenProps>) {
  const defaultSession: Session = {
    name: null,
    blocklists: [] as Blocklist[],
    devices: [] as Device[],
    start: null,
    end: null,
  }
  const [formResult, setFormResult] = useState({})
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)

  return (
    <TiedSLinearBackground>
      <Formik
        initialValues={defaultSession}
        onSubmit={(values) => {
          setFormResult(values)
          setIsResultModalOpen(true)
        }}
      >
        {(form) => (
          <SelectBlockSessionParams form={form} navigation={navigation} />
        )}
      </Formik>

      <TiedSModal
        visible={isResultModalOpen}
        onRequestClose={() => setIsResultModalOpen(!isResultModalOpen)}
      >
        <View style={{ flexDirection: 'column' }}>
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
