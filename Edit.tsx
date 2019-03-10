import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  TextInput
} from 'react-native'
import AutoResponsive from 'autoresponsive-react-native'
const Utils = require('./Utils')

type edit = {
  text: string
}

export default class NoteEdit extends Component<{}, edit> {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  render() {
    return (
      <View style={styles.flex}>
        <Text style={styles.tip}>
          {Utils.timestampToString(new Date().getTime())}
          {' | '}
          {this.state.text.length}字
        </Text>
        <View style={styles.flex}>
          <View style={styles.flex}>
            <TextInput
              style={styles.input}
              multiline={true}
              autoFocus={true}
              onChangeText={text => this.setState({ text })}
              style={styles.flex}
            />
          </View>
        </View>
      </View>
    )
  }
}

//样式定义
const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  input: {
    flex: 1,
    marginLeft: 4,
    paddingLeft: 4
  },
  tip: {
    marginLeft: 4,
    marginTop: 4,
    color: '#C0C0C0'
  }
})
