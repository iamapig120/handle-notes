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
  TouchableNativeFeedback,
  TextInput,
  Button,
  DeviceEventEmitter
} from 'react-native'
import AutoResponsive from 'autoresponsive-react-native'
const Utils = require('./Utils')

type edit = {
  text: string
  height: number
  focus: boolean
  skin: string
  timestamp: number
}

export default class NoteEdit extends Component<{}, edit> {
  constructor(props) {
    super(props)
    const { note, del, save, skin } = this.props.navigation.state.params
    this.state = {
      get text() {
        return note.text
      },
      set text(value) {
        note.text = value
      },
      height: 30,
      focus: false,
      get skin() {
        return note.skin
      },
      set skin(value) {
        note.skin = value
      },
      get timestamp() {
        return note.timestamp
      }
    }
    this.props.navigation.setParams({
      finishEdit: () => {
        this.setState(prevState => {
          return { focus: false }
        })
        this.TextInput.blur()
      },
      setSkin: () => {
        const nowSelectSkin = this.state.skin
        const skinsArr = ['white', 'yellow', 'green', 'red']
        let indexOf = skinsArr.indexOf(nowSelectSkin)
        indexOf++
        if (indexOf >= skinsArr.length) {
          indexOf = 0
        }
        this.setState(prevState => {
          return { skin: skinsArr[indexOf] }
        })
        note.skin = skinsArr[indexOf]
      }
    })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '编辑',
      headerRight: [
        <TouchableNativeFeedback
          onPress={() => {
            navigation.getParam('del')()
            navigation.goBack()
            DeviceEventEmitter.emit('Reload')
          }}
          key="2"
        >
          <View
            style={{
              width: 60,
              height: 30,
              marginRight: 8,
              borderColor: '#999',
              borderRadius: 4,
              borderWidth: 1
            }}
          >
            <View
              style={{
                flex: 1,
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                删除
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>,
        <TouchableNativeFeedback
          onPress={() => {
            navigation.getParam('setSkin')()
            navigation.getParam('skin')()
            navigation.getParam('save')()
            DeviceEventEmitter.emit('Reload')
          }}
          key="1"
        >
          <View
            style={{
              width: 60,
              height: 30,
              marginRight: 8,
              borderColor: '#999',
              borderRadius: 4,
              borderWidth: 1
            }}
          >
            <View
              style={{
                flex: 1,
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                皮肤
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>,
        <TouchableNativeFeedback
          onPress={() => {
            navigation.getParam('finishEdit')()
            navigation.goBack()
          }}
          key="0"
        >
          <View
            style={{
              width: 60,
              height: 30,
              marginRight: 12,
              borderColor: '#999',
              borderRadius: 4,
              borderWidth: 1
            }}
          >
            <View
              style={{
                flex: 1,
                textAlign: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                完成
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      ]
    }
  }

  cauculateHeight(e) {
    const height =
      e.nativeEvent.contentSize.height > 30
        ? e.nativeEvent.contentSize.height
        : this.state.height
    this.setState({ height })
  }

  render() {
    return (
      <View style={styles[this.state.skin].flex}>
        <Text style={styles[this.state.skin].tip}>
          {Utils.timestampToString(new Date().getTime())}
          {' | '}
          {this.state.text.length}字
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles[this.state.skin].flex}
          onPress={() => {
            if (!this.state.focus) {
              this.TextInput.focus()
            } else {
              this.TextInput.blur()
            }
            this.setState(prevState => {
              return { focus: !prevState.focus }
            })
          }}
        >
          <View style={styles[this.state.skin].flex}>
            <TextInput
              style={[
                styles[this.state.skin].input,
                { height: this.state.height }
              ]}
              multiline={true}
              autoFocus={true}
              underlineColorAndroid="transparent"
              onChangeText={text => {
                this.setState({ text })
                this.props.navigation.state.params.note.text = text
                this.props.navigation.state.params.save()
                DeviceEventEmitter.emit('Reload')
              }}
              ref={textInput => (this.TextInput = textInput)}
              onContentSizeChange={e => this.cauculateHeight(e)}
              onFocus={() => {
                this.setState(prevState => {
                  return { focus: true }
                })
              }}
              defaultValue={this.state.text}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

//样式定义
const styles = {
  yellow: StyleSheet.create({
    flex: {
      backgroundColor: '#FFFDE7',
      flex: 1
    },
    input: {
      lineHeight: 22,
      fontSize: 16,
      // height: 80,
      // marginLeft: 4,
      paddingTop: 8,
      paddingLeft: 8,
      color: '#C09C00'
    },
    tip: {
      marginLeft: 4,
      marginTop: 4,
      color: '#C0C0C0'
    }
  }),
  white: StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: '#FFF'
    },
    input: {
      lineHeight: 22,
      fontSize: 16,
      // height: 80,
      // marginLeft: 4,
      paddingTop: 8,
      paddingLeft: 8,
      color: '#333'
    },
    tip: {
      marginLeft: 4,
      marginTop: 4,
      color: '#C0C0C0'
    }
  }),
  green: StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: '#F0FFF0'
    },
    input: {
      lineHeight: 22,
      fontSize: 16,
      // height: 80,
      // marginLeft: 4,
      paddingTop: 8,
      paddingLeft: 8,
      color: '#88AA88'
    },
    tip: {
      marginLeft: 4,
      marginTop: 4,
      color: '#C0C0C0'
    }
  }),
  red: StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: '#FFF0F0'
    },
    input: {
      lineHeight: 22,
      fontSize: 16,
      // height: 80,
      // marginLeft: 4,
      paddingTop: 8,
      paddingLeft: 8,
      color: '#AA8888'
    },
    tip: {
      marginLeft: 4,
      marginTop: 4,
      color: '#C0C0C0'
    }
  })
}
