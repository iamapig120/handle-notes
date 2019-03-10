/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './Home'
import Edit from './Edit'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Note: {
      screen: Edit
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FAFAFA'
      },
      headerTitleStyle: {
        fontWeight: '300'
      }
    }
  }
)

export default createAppContainer(AppNavigator)
