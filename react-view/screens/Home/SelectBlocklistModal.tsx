import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import { T } from '../../design-system/theme'
import React, { useEffect, useState } from 'react'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSModal } from '../../design-system/components/TiedSModal'
import { Blocklist } from '../../../core/blocklist/blocklist'
import { blocklistRepository } from '../../dependencies'

export function SelectBlocklistModal(
  props: Readonly<{
    visible: boolean
    blocklists: Blocklist[]
    onRequestClose: () => void
    onPress: () => void
    setFieldValue: (field: string, value: any) => void
  }>,
) {
  const [availableBlocklists, setAvailableBlocklists] = useState<Blocklist[]>(
    [],
  )
  const [selectedBlocklists, setSelectedBlocklists] = useState<Blocklist[]>([])

  useEffect(() => {
    blocklistRepository
      .getBlocklists()
      .then((blocklists) => setAvailableBlocklists(blocklists))
  }, [])

  const handleSave = () => {
    props.setFieldValue('blocklists', selectedBlocklists)
    props.onRequestClose()
  }

  function selectBlocklist(item: Blocklist) {
    return (isSelected: boolean) => {
      const newSelections: Blocklist[] = isSelected
        ? [...selectedBlocklists, item]
        : selectedBlocklists.filter((blocklist) => blocklist.id !== item.id)
      setSelectedBlocklists(newSelections)
    }
  }

  return (
    <TiedSModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <View>
        {availableBlocklists.length === 0 && (
          <Text style={styles.itemText}>No devices available</Text>
        )}

        <FlatList
          data={availableBlocklists}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Switch
                value={selectedBlocklists.includes(item)}
                onValueChange={selectBlocklist(item)}
              />
            </View>
          )}
        />
        <TiedSButton
          style={styles.button}
          onPress={() => {
            handleSave()
            props.onPress()
          }}
          text={'SAVE'}
        />
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
