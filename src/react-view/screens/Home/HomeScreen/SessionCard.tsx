import { StyleSheet, Text, View } from 'react-native'
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

function RoundBlueDot() {
  const roundSize = 15

  return (
    <View
      style={{
        margin: T.spacing.small,
        marginRight: T.spacing.x_large,
        width: roundSize,
        height: roundSize,
        borderRadius: roundSize / 2,
        backgroundColor: T.color.lightBlue,
      }}
    />
  )
}

export function SessionCard(
  props: Readonly<{
    session: {
      id: string
      name: string
      minutesLeft: string
      blocklists: number
      devices: number
    }
  }>,
) {
  const dispatch = useDispatch<AppDispatch>()

  const [isRenameModalVisible, setRenameModalVisible] = useState(false)
  const [isDuplicateModalVisible, setIsDuplicateModalVisible] = useState(false)

  const sessionCardMenu = [
    {
      name: 'Rename',
      iconName: 'text-outline' as const,
      action: () => {
        setRenameModalVisible(true)
      },
    },
    {
      name: 'Edit',
      iconName: 'create-outline' as const,
      action: () => {},
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
      <TiedSBlurView>
        <RoundBlueDot />
        <View>
          <Text style={styles.sessionName}>{props.session.name}</Text>
          <Text style={styles.minutesLeft}>{props.session.minutesLeft}</Text>
          <Text style={styles.devices}>
            {props.session.devices} device, {props.session.blocklists} blocklist
          </Text>
        </View>
        <ThreeDotMenu menuOptions={sessionCardMenu} style={styles.menu} />
      </TiedSBlurView>

      <TextInputModal
        visible={isRenameModalVisible}
        label={'Rename block session'}
        initialText={props.session.name}
        onRequestClose={() => {
          setRenameModalVisible(false)
        }}
        onCancel={() => {
          setRenameModalVisible(false)
        }}
        onSave={(inputText: string) => {
          dispatch(
            renameBlockSession({ id: props.session.id, name: inputText }),
          )
          setRenameModalVisible(false)
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
