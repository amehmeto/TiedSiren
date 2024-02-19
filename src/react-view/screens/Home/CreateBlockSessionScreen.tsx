import { useState } from 'react'
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
import { AppDispatch } from '../../../core/createStore.ts'
import { useDispatch } from 'react-redux'
import { createBlockSession } from '../../../core/block-session/usecases/create-block-session.usecase.ts'
import uuid from 'react-native-uuid'
import { BlockSession } from '../../../core/block-session/block.session.ts'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<ScreenList, TabScreens.HOME>
}

export type Session = {
  id: string
  name: string | null
  blocklists: Blocklist[]
  devices: Device[]
  start: string | null
  end: string | null
}

export function CreateBlockSessionScreen({
  navigation,
}: Readonly<HomeScreenProps>) {
  const dispatch = useDispatch<AppDispatch>()

  const defaultSession: Session = {
    id: uuid.v4().toString(),
    name: null,
    blocklists: [] as Blocklist[],
    devices: [] as Device[],
    start: null,
    end: null,
  }

  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)

  function assertIsBlockSession(
    values: Session,
  ): asserts values is BlockSession {
    if (!Object.values(values).every((value) => value !== null)) {
      throw new Error('Some properties are null')
    }
  }

  return (
    <TiedSLinearBackground>
      <Formik
        initialValues={defaultSession}
        onSubmit={(values) => {
          assertIsBlockSession(values)
          dispatch(createBlockSession(values))
        }}
      >
        {(form) => (
          <SelectBlockSessionParams form={form} navigation={navigation} />
        )}
      </Formik>
      {/* Temporary modal to display a form result */}
      <TiedSModal
        isVisible={isResultModalOpen}
        onRequestClose={() => setIsResultModalOpen(!isResultModalOpen)}
      >
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ color: T.color.text }}>
            {/*{JSON.stringify(values, null, 2)}*/}
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
