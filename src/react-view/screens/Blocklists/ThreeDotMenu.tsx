import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { Ionicons } from '@expo/vector-icons'
import { T } from '../../design-system/theme.ts'
import { TiedSBlurView } from '../../design-system/components/TiedSBlurView.tsx'
import { Dimensions, StyleSheet, Text } from 'react-native'

type MenuOptionName = 'Rename' | 'Edit' | 'Duplicate' | 'Delete'

type IconName =
  | 'text-outline'
  | 'create-outline'
  | 'copy-outline'
  | 'trash-outline'

function TiedSMenuOption(props: { value: MenuOptionName; iconName: IconName }) {
  return (
    <MenuOption value={props.value} style={styles.menuOption}>
      <Text style={styles.menuOptionText}>{props.value}</Text>
      <Ionicons
        name={props.iconName}
        size={T.size.medium}
        color={T.color.white}
      />
    </MenuOption>
  )
}

export function ThreeDotMenu() {
  const menuOptions = {
    Rename: {
      iconName: 'text-outline' as const,
      action: () => {},
    },
    Edit: {
      iconName: 'create-outline' as const,
      action: () => {},
    },
    Duplicate: {
      iconName: 'copy-outline' as const,
      action: () => {},
    },

    Delete: {
      iconName: 'trash-outline' as const,
      action: () => {},
    },
  }

  const selectMenuOption = (value: MenuOptionName) => {
    menuOptions[value].action()
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
          {Object.entries(menuOptions).map(([key, entry]) => (
            <TiedSMenuOption
              key={key}
              value={key as MenuOptionName}
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
