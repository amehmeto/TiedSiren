import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TiedSLinearBackground } from '../../../design-system/components/TiedSLinearBackground.tsx'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { TabScreens } from '../../../navigators/screen-lists/TabScreens.ts'
import { Formik } from 'formik'
import { Blocklist } from '../../../../core/blocklist/blocklist.ts'
import { Device } from '../../../../core/device/device.ts'
import { SelectBlockSessionParams } from './SelectBlockSessionParams.tsx'
import { AppDispatch } from '../../../../core/_redux_/createStore.ts'
import { useDispatch } from 'react-redux'
import { createBlockSession } from '../../../../core/block-session/usecases/create-block-session.usecase.ts'
import uuid from 'react-native-uuid'
import { BlockSession } from '../../../../core/block-session/block.session.ts'
// import { z } from 'zod'

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

  /*  const validationSchema = z.object({
    id: z.string(),
    name: z.string(),
    blocklists: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        totalBlocks: z.number(),
      }),
    ),
    devices: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    ),
    start: z.string(),
    end: z.string(),
  })*/

  function assertIsBlockSession(
    values: Session,
  ): asserts values is BlockSession {
    if (!Object.values(values).every((value) => value !== null)) {
      throw new Error(
        `Some properties are null ${JSON.stringify(values, null, 2)}`,
      )
    }
  }

  return (
    <TiedSLinearBackground>
      <Formik
        initialValues={defaultSession}
        /*
        validate={(values) => {
          try {
            console.log('Validate values')
            return validationSchema.parse(values)
          } catch (e) {
            if (e instanceof z.ZodError) return e.formErrors.fieldErrors

            return e
          }
        }}
        */
        onSubmit={(values) => {
          assertIsBlockSession(values)
          dispatch(createBlockSession(values))
        }}
      >
        {(form) => (
          <SelectBlockSessionParams form={form} navigation={navigation} />
        )}
      </Formik>
    </TiedSLinearBackground>
  )
}
