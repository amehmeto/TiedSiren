import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import { T } from '../../design-system/theme'
import React, { useEffect, useState } from 'react'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSModal } from '../../design-system/components/TiedSModal'
import { Device } from '../../../core/device/device'
import { deviceRepository } from '../../dependencies'

export function SelectDeviceModal(
  props: Readonly<{
    visible: boolean
    devices: Device[]
    onRequestClose: () => void
    onPress: () => void
    setFieldValue: (field: string, value: any) => void
  }>,
) {
  const [availableDevices, setAvailableDevices] = useState<Device[]>([])
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([])

  useEffect(() => {
    deviceRepository
      .getDevices()
      .then((devices) => setAvailableDevices(devices))
  }, [])

  const handleSave = () => {
    props.setFieldValue('devices', selectedDevices)
    props.onRequestClose()
  }

  function selectDevices(item: Device) {
    return (isSelected: boolean) => {
      const newSelections: Device[] = isSelected
        ? [...selectedDevices, item]
        : selectedDevices.filter((device) => device.id !== item.id)
      setSelectedDevices(newSelections)
    }
  }

  return (
    <TiedSModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <View>
        {props.devices.length === 0 && (
          <Text style={styles.itemText}>No devices available</Text>
        )}

        <FlatList
          data={availableDevices}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Switch
                value={selectedDevices.includes(item)}
                onValueChange={selectDevices(item)}
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
