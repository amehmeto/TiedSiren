import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { Ionicons } from '@expo/vector-icons'
import { T } from '../theme.ts'
import { TiedSBlurView } from './TiedSBlurView.tsx'
import { Dimensions, StyleSheet, Text } from 'react-native'
import { BlocklistCardMenu } from '../../screens/Blocklists/BlocklistCard.tsx'

function TiedSMenuOption(props: {
  optionName: BlocklistCardMenu['name']
  iconName: BlocklistCardMenu['iconName']
}) {
  return (
    <MenuOption value={props.optionName} style={styles.menuOption}>
      <Text style={styles.menuOptionText}>{props.optionName}</Text>
      <Ionicons
        name={props.iconName}
        size={T.size.medium}
        color={T.color.white}
      />
    </MenuOption>
  )
}

export function ThreeDotMenu(props: { menuOptions: BlocklistCardMenu[] }) {
  const selectMenuOption = (optionName: BlocklistCardMenu['name']) => {
    const selectedOption = props.menuOptions.find(
      (option) => option.name === optionName,
    )
    if (!selectedOption) throw new Error('Invalid menu option')
    selectedOption.action()
  }

  return (
    <Menu onSelect={selectMenuOption}>
      <MenuTrigger>
        <Ionicons
          name="ellipsis-horizontal"
          size={T.size.medium}
          color={T.color.white}
        />
      </MenuTrigger>
      <MenuOptions customStyles={optionsStyles}>
        <TiedSBlurView style={styles.menuOptions}>
          {Object.entries(props.menuOptions).map(([key, entry]) => (
            <TiedSMenuOption
              key={key}
              optionName={entry.name}
              iconName={entry.iconName}
            />
          ))}
        </TiedSBlurView>
      </MenuOptions>
    </Menu>
  )
}
// TODO: hacky, should fix it be finding a way to apply width 100% and flex options
const betweenHalfAndThirdOfWindow = Dimensions.get('window').width / 2.5

const styles = StyleSheet.create({
  menuOptionText: {
    color: T.color.white,
    fontSize: T.size.small,
  },
  menuOptions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: T.spacing.none,
    marginTop: T.spacing.none,
    marginBottom: T.spacing.none,
  },
  menuOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: betweenHalfAndThirdOfWindow - T.spacing.medium * 2,
    flex: 1,
  },
})

const optionsStyles = {
  optionsContainer: {
    backgroundColor: T.color.transparent,
    borderRadius: T.border.radius.roundedSmall,
    width: betweenHalfAndThirdOfWindow,
  },
}
