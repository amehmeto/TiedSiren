import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { T } from '../../../design-system/theme.ts'
import { ThreeDotMenu } from '../../../design-system/components/ThreeDotMenu.tsx'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../core/_redux_/createStore.ts'
import { useState } from 'react'
import { TextInputModal } from '../../Blocklists/TextInputModal.tsx'
import { deleteBlockSession } from '../../../../core/block-session/usecases/delete-block-session.usecase.ts'
import { duplicateBlockSession } from '../../../../core/block-session/usecases/duplicate-block-session.usecase.ts'
import { renameBlockSession } from '../../../../core/block-session/usecases/rename-block-session.usecase.ts'
import { RoundBlueDot } from './RoundBlueDot.tsx'
import { useNavigation } from '@react-navigation/native'
import { HomeStackScreens } from '../../../navigators/screen-lists/HomeStackScreens.ts'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenList } from '../../../navigators/screen-lists/screenLists.ts'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SessionType } from './SessionType.ts'

export function SessionCard(
  props: Readonly<{
    session: {
      id: string
      name: string
      minutesLeft: string
      blocklists: number
      devices: number
    }
    type: SessionType
  }>,
) {
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation<NativeStackNavigationProp<ScreenList>>()

  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false)
  const [isDuplicateModalVisible, setIsDuplicateModalVisible] = useState(false)

  const sessionCardMenu = [
    {
      name: 'Rename',
      iconName: 'text-outline' as const,
      action: () => {
        setIsRenameModalVisible(true)
      },
    },
    {
      name: 'Edit',
      iconName: 'create-outline' as const,
      action: () => {
        navigation.navigate(HomeStackScreens.EDIT_BLOCK_SESSION, {
          sessionId: props.session.id,
        })
      },
    },
    {
      name: 'Duplicate',
      iconName: 'copy-outline' as const,
      action: () => {
        setIsDuplicateModalVisible(true)
      },
    },
    {
      name: 'Delete',
      iconName: 'trash-outline' as const,
      action: () => {
        dispatch(deleteBlockSession(props.session.id))
      },
    },
  ]

  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate(HomeStackScreens.EDIT_BLOCK_SESSION, {
            sessionId: props.session.id,
          })
        }}
      >
        <TiedSBlurView>
          {props.type === SessionType.ACTIVE ? (
            <RoundBlueDot />
          ) : (
            <MaterialCommunityIcons
              name={'clock-outline'}
              size={16}
              color={T.color.lightBlue}
              style={{
                margin: T.spacing.small,
                marginRight: T.spacing.x_large,
              }}
            />
          )}
          <View>
            <Text style={styles.sessionName}>{props.session.name}</Text>
            <Text style={styles.minutesLeft}>{props.session.minutesLeft}</Text>
            <Text style={styles.devices}>
              {props.session.devices} device, {props.session.blocklists}{' '}
              blocklist
            </Text>
          </View>
          <ThreeDotMenu menuOptions={sessionCardMenu} style={styles.menu} />
        </TiedSBlurView>
      </Pressable>

      <TextInputModal
        visible={isRenameModalVisible}
        label={'Rename block session'}
        initialText={props.session.name}
        onRequestClose={() => {
          setIsRenameModalVisible(false)
        }}
        onCancel={() => {
          setIsRenameModalVisible(false)
        }}
        onSave={(inputText: string) => {
          dispatch(
            renameBlockSession({ id: props.session.id, name: inputText }),
          )
          setIsRenameModalVisible(false)
        }}
      />
      <TextInputModal
        visible={isDuplicateModalVisible}
        label={'Choose the name of the duplicated block session'}
        initialText={'Copy of "' + props.session.name + '"'}
        onRequestClose={() => {
          setIsDuplicateModalVisible(false)
        }}
        onCancel={() => {
          setIsDuplicateModalVisible(false)
        }}
        onSave={(inputText: string) => {
          dispatch(
            duplicateBlockSession({ id: props.session.id, name: inputText }),
          )
          setIsDuplicateModalVisible(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  sessionName: { color: T.color.text, fontWeight: T.font.weight.bold },
  minutesLeft: { color: T.color.lightBlue, fontWeight: T.font.weight.bold },
  devices: { color: T.color.text },
  menu: { marginLeft: 'auto', alignSelf: 'flex-start' },
})
