import { Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabList } from '../../App'
import { TabScreens } from '../navigators/BottomTabNavigator'

const BlockSessionParamStyle = {
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
  paddingTop: 20,
  paddingBottom: 20,
  paddingLeft: 10,
  paddingRight: 10,
}

const currentSessionBoardStyle = {
  padding: 15,
  marginTop: 10,
  marginBottom: 10,
  borderRadius: 5,
  shadowColor: '#1e1e1e',
  shadowOffset: {
    width: 5,
    height: 5,
  },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 20, // for Android
}

type Props = {
  label: string
  option: string
}

function BlockSessionParam({ label, option }: Props) {
  const labelStyle = { color: 'white' }
  const optionStyle = { color: 'rgba(0,212,255,1)' }

  return (
    <View style={BlockSessionParamStyle}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={optionStyle}>{option}</Text>
    </View>
  )
}

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, TabScreens.HOME>
}

export function CreateBlockSessionScreen({
  navigation,
}: Readonly<HomeScreenProps>) {
  const BlocklistParams = [
    ['Blocklists', 'Distractions'],
    ['Devices', 'Google Pixel 3a, Huawei P20, Lenovo Tab'],
    ['Starts', '19:00'],
    ['Ends', '21:00'],
    ['Session Name', 'Working time'],
  ]

  return (
    <LinearGradient
      colors={['rgb(69,64,196)', 'rgb(105,178,225)', 'rgba(0,212,255,1)']}
      start={{ x: 0.4, y: 0.5 }}
      end={{ x: 1.5, y: 0.6 }}
      style={{ flex: 1, padding: 20 }}
    >
      <BlurView intensity={90} style={currentSessionBoardStyle} tint={'dark'}>
        {BlocklistParams.map(([label, option]) => (
          <BlockSessionParam key={label} label={label} option={option} />
        ))}
      </BlurView>

      <Pressable
        style={{
          borderRadius: 5,
          backgroundColor: 'rgba(0,212,255,1)',
          marginTop: 20,
          padding: 10,
          shadowColor: '#1e1e1e',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        }}
        onPress={() => navigation.navigate(TabScreens.HOME)}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            borderRadius: 5,
          }}
        >
          START
        </Text>
      </Pressable>
    </LinearGradient>
  )
}
