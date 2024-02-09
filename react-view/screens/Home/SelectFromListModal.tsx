import { FlatList, StyleSheet, Switch, Text, View } from 'react-native'
import { T } from '../../design-system/theme'
import React from 'react'
import { TiedSButton } from '../../design-system/components/TiedSButton'
import { TiedSModal } from '../../design-system/components/TiedSModal'

export function SelectFromListModal(
  props: Readonly<{
    visible: boolean
    list: string[]
    onRequestClose: () => void
    onPress: () => void
  }>,
) {
  return (
    <TiedSModal visible={props.visible} onRequestClose={props.onRequestClose}>
      <View>
        <FlatList
          data={props.list}
          renderItem={({ item }) => (
            <View key={item} style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
              <Switch value={true} />
            </View>
          )}
        />
        <TiedSButton
          style={styles.button}
          onPress={props.onPress}
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
