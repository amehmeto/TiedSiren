import * as React from 'react'
import { FlatList, StyleSheet, TextInput } from 'react-native'
import { T } from '../../../design-system/theme.ts'
import { useState } from 'react'
import { SelectableSirenCard } from '../SelectableSirenCard.tsx'
import { SirenType } from '../../../../core/blocklist/blocklist.ts'

export function TextInputSelectionScene(props: {
  onSubmitEditing: (event: { nativeEvent: { text: string } }) => void
  placeholder: string
  sirenType: SirenType.WEBSITES | SirenType.KEYWORDS
  data: string[]
  toggleSiren: (sirenType: SirenType, sirenId: string) => void
  isSirenSelected: (sirenType: SirenType, sirenId: string) => boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <TextInput
        style={[
          styles.addWebsiteInput,
          { borderColor: isFocused ? T.color.lightBlue : T.color.white },
        ]}
        placeholder={props.placeholder}
        placeholderTextColor={T.color.white}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={props.onSubmitEditing}
      />
      <FlatList
        data={props.data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <SelectableSirenCard
            sirenType={props.sirenType}
            siren={item}
            onPress={() => props.toggleSiren(props.sirenType, item)}
            isSelected={props.isSirenSelected(props.sirenType, item)}
          />
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({
  addWebsiteInput: {
    borderBottomWidth: 2,
    padding: T.spacing.small,
    color: T.color.white,
  },
})
