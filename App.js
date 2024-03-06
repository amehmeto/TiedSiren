'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var native_1 = require('@react-navigation/native')
var react_1 = require('react')
var NavigationBar = require('expo-navigation-bar')
var react_native_1 = require('react-native')
var BottomTabNavigator_1 = require('./src/react-view/navigators/BottomTabNavigator')
var theme_1 = require('./src/react-view/design-system/theme')
var createStore_1 = require('./src/core/_redux_/createStore')
var fake_data_block_session_repository_1 = require('./src/infra/block-session-repository/fake-data.block-session.repository')
var react_redux_1 = require('react-redux')
var blockSessionRepository =
  new fake_data_block_session_repository_1.FakeDataBlockSessionRepository()
var store = (0, createStore_1.createStore)({
  blockSessionRepository: blockSessionRepository,
})
function App() {
  ;(0, react_1.useEffect)(function () {
    if (react_native_1.Platform.OS === 'android')
      NavigationBar.setBackgroundColorAsync(theme_1.T.color.darkBlue).catch(
        function (e) {
          console.error('Failed to set navigation bar color', e)
        },
      )
  }, [])
  return (
    <react_redux_1.Provider store={store}>
      <native_1.NavigationContainer>
        <BottomTabNavigator_1.BottomTabNavigator />
      </native_1.NavigationContainer>
    </react_redux_1.Provider>
  )
}
exports.default = App
