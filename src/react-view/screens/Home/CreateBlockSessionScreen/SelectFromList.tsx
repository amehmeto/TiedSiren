import { Session } from './CreateBlockSessionScreen.tsx'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SelectListModal } from './SelectListModal.tsx'
import { useState } from 'react'
import { FormikErrors } from 'formik'
import { T } from '../../../design-system/theme.ts'
import { Blocklist } from '../../../../core/blocklist/blocklist.ts'
import { Device } from '../../../../core/device/device.ts'

export function SelectFromList({
  values,
  setFieldValue,
  listType,
  getItems,
}: Readonly<{
  listType: 'blocklists' | 'devices'
  values: Session
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<Session>>
  getItems: () => Promise<(Blocklist | Device)[]>
}>) {
  const [isList, setIsList] = useState<boolean>(false)

  function selectItemsFrom(
    list: Blocklist[] | Device[],
    listName: 'blocklists' | 'devices',
  ) {
    return list.length > 0
      ? values[listName].map((item) => item.name).join(', ')
      : `Select ${listName}...`
  }

  const capitalizedListParam =
    listType.charAt(0).toUpperCase() + listType.slice(1)
  const selectedItems = selectItemsFrom(values[listType], listType)

  return (
    <>
      <View style={styles.param}>
        <Text style={styles.label}>{capitalizedListParam}</Text>
        <Pressable onPress={() => setIsList(true)}>
          <Text style={styles.option}>{selectedItems}</Text>
        </Pressable>
      </View>
      <SelectListModal
        visible={isList}
        list={values[listType]}
        onRequestClose={() => setIsList(!isList)}
        setFieldValue={setFieldValue}
        listType={listType}
        getItems={getItems}
      />
    </>
  )
}

const styles = StyleSheet.create({
  param: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: T.spacing.medium,
    paddingBottom: T.spacing.medium,
    paddingLeft: T.spacing.small,
    paddingRight: T.spacing.small,
  },
  label: {
    color: T.color.text,
  },
  option: {
    color: T.color.lightBlue,
    textAlign: 'right',
  },
})
