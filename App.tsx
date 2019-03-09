/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    '双击您键盘上的 R 键来重新载入\n' +
    '摇晃您的手机或是按下 菜单键 来开启开发者菜单'
})

type titleBar = {
  text: string
  leftButton: Component | null | undefined
  rightButton: Component | null | undefined
}

class TitleBar extends Component<titleBar> {
  render() {
    return (
      <View style={styles.titleBar}>
        <Text style={styles.titleBarText}>{this.props.text}</Text>
      </View>
    )
  }
}

type mainWindow = {}
export default class App extends Component<mainWindow> {
  render() {
    return (
      <View style={styles.container}>
        <TitleBar text="柄家便签" leftButton={null} rightButton={null} />
        <View style={styles.instruction}>
          <Text style={styles.instructions}>要开始，请编辑 App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  titleBar: {
    flex: 0,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'steelblue'
  },
  titleBarText: {
    fontSize: 16,
    color: '#FFFFFF'
  },
  welcome: {
    flex: 0,
    fontSize: 16,
    textAlign: 'center',
    height: 48,
    backgroundColor: 'skyblue'
    // margin: 10
  },
  instruction: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#333333'
    // marginBottom: 5
  },
  instructions: {
    textAlign: 'center',
    color: '#333333'
    // marginBottom: 5
  }
})
