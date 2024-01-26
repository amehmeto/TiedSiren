import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { BottomTabList } from './App'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { TiedSirenLogoSvg } from './TiedSirenLogoSvg'
import 'react-native-gesture-handler'

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<BottomTabList, 'Home'>
}

function RoundBlueDot() {
  return (
    <View
      style={{
        margin: 10,
        marginRight: 25,
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        backgroundColor: 'rgba(0,212,255,1)',
      }}
    ></View>
  )
}

export function HomeScreen({ navigation }: Readonly<HomeScreenProps>) {
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
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  }

  const titleStyle = {
    fontWeight: 'bold' as const,
    color: 'white',
    fontFamily: 'Verdana',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  }

  return (
    <LinearGradient
      colors={['rgb(69,64,196)', 'rgb(105,178,225)', 'rgba(0,212,255,1)']}
      start={{ x: 0.4, y: 0.5 }}
      end={{ x: 1.5, y: 0.6 }}
      style={{ flex: 1, padding: 20 }}
    >
      <TiedSirenLogoSvg />
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
        Good Afternoon
      </Text>
      <Text style={{ color: 'white' }}>Let's make it productive</Text>

      <Text style={titleStyle}>ACTIVE SESSIONS</Text>

      <BlurView intensity={90} style={currentSessionBoardStyle} tint={'dark'}>
        <RoundBlueDot />
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Sleeping time
          </Text>
          <Text style={{ color: 'rgba(0,212,255,1)', fontWeight: 'bold' }}>
            21 minutes left
          </Text>
          <Text style={{ color: 'white' }}>1 device, 1 blocklist</Text>
        </View>
      </BlurView>

      <BlurView intensity={90} style={currentSessionBoardStyle} tint={'dark'}>
        <RoundBlueDot />
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Working time
          </Text>
          <Text style={{ color: 'rgba(0,212,255,1)', fontWeight: 'bold' }}>
            21 minutes left
          </Text>
          <Text style={{ color: 'white' }}>1 device, 1 blocklist</Text>
        </View>
      </BlurView>

      <Text style={titleStyle}>NO SCHEDULED SESSIONS</Text>

      <Text style={{ color: 'white' }}>
        Scheduled sessions start automatically and help you to stick to a plan,
        giving you distraction-free focus when you need it most
      </Text>

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
        onPress={() => navigation.navigate('CreateBlockSession')}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            borderRadius: 5,
          }}
        >
          CREATE A BLOCK SESSION
        </Text>
      </Pressable>
    </LinearGradient>
  )
}
