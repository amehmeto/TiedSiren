import { NavigationContainer } from '@react-navigation/native'
import { BottomTabNavigator } from './react-view/navigators/BottomTabNavigator'

export type BottomTabList = {
  Home: undefined
  BlockList: undefined
  Settings: undefined
  Details: undefined
  CreateBlockSession: undefined
}

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
