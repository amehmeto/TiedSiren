import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import { T } from '../../design-system/theme'
import React, { useEffect, useState } from 'react'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSModal } from '../../design-system/components/TiedSModal'
import { Blocklist } from '../../../core/blocklist/blocklist'
import { Device } from '../../../core/device/device'

export function SelectListModal(
  props: Readonly<{
    visible: boolean
    list: (Blocklist | Device)[]
    listType: 'blocklists' | 'devices'
    onRequestClose: () => void
    setFieldValue: (field: string, value: any) => void
    getItems: () => Promise<(Blocklist | Device)[]>
  }>,
) {
  const [availableListItems, setAvailableListItems] = useState<
    (Blocklist | Device)[]
  >([])
  const [selectedItems, setSelectedItems] = useState<(Blocklist | Device)[]>([])

  useEffect(() => {
    props.getItems().then((list) => setAvailableListItems(list))
  }, [])

  const saveList = () => {
    props.setFieldValue(props.listType, selectedItems)
    props.onRequestClose()
  }

  function toggleList(item: Blocklist | Device) {
    return (isSelected: boolean) => {
      const newSelections: (Blocklist | Device)[] = isSelected
        ? [...selectedItems, item]
        : selectedItems.filter((_item) => _item.id !== item.id)
      setSelectedItems(newSelections)
    }
  }

  return (
    <TiedSModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <View>
        {availableListItems.length === 0 && (
          <Text style={styles.itemText}>No {props.listType} available</Text>
        )}

        <FlatList
          data={availableListItems}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Switch
                value={selectedItems.includes(item)}
                onValueChange={toggleList(item)}
              />
            </View>
          )}
        />
        <TiedSButton style={styles.button} onPress={saveList} text={'SAVE'} />
      </View>
    </TiedSModal>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: T.spacing.small,
  },
  itemText: { color: T.color.text },
  button: {
    alignSelf: 'center',
    marginTop: T.spacing.medium,
  },
})
