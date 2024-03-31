import { StyleSheet, Text, View } from 'react-native'
import { TiedSBlurView } from '../../../design-system/components/TiedSBlurView.tsx'
import { T } from '../../../design-system/theme.ts'
import { ThreeDotMenu } from '../../../design-system/components/ThreeDotMenu.tsx'

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
      name: string
      minutesLeft: string
      blocklists: number
      devices: number
    }
  }>,
) {
  const sessionCardMenu = [
    {
      name: 'Rename',
      iconName: 'text-outline' as const,
      action: () => {},
    },
    {
      name: 'Edit',
      iconName: 'create-outline' as const,
      action: () => {},
    },
    {
      name: 'Duplicate',
      iconName: 'copy-outline' as const,
      action: () => {},
    },
    {
      name: 'Delete',
      iconName: 'trash-outline' as const,
      action: () => {},
    },
  ]

  return (
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
  )
}

const styles = StyleSheet.create({
  sessionName: { color: T.color.text, fontWeight: T.font.weight.bold },
  minutesLeft: { color: T.color.lightBlue, fontWeight: T.font.weight.bold },
  devices: { color: T.color.text },
  menu: { marginLeft: 'auto', alignSelf: 'flex-start' },
})
