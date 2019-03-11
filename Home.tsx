/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
const Utils = require('./Utils')
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView,
  Dimensions,
  StatusBar,
  LayoutChangeEvent,
  TouchableNativeFeedback,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native'
import AutoResponsive from 'autoresponsive-react-native'

const NOTES_DATA: { [x: string]: note } = {
  'UAAD-SAE5-34KC-PRE6': {
    skin: 'yellow',
    text: '123\n456\nsada',
    timestamp: 1552171024000
  },
  'UAAD-SAE5-DFAK-ERRD': {
    skin: 'yellow',
    text: '123\n456\nasdsa\naser',
    timestamp: 1552171026000
  },
  'UAAD-SAE5-37FY-7GHK': {
    skin: 'yellow',
    text: '123\n456\nfads',
    timestamp: 1552171055000
  },
  'UAAD-SAE5-SVI5-AX83': {
    skin: 'yellow',
    text: '123\n456\naser\naser\naser\naser',
    timestamp: 1552171077000
  },
  'UAAD-SAE5-VSOP-AS18': {
    skin: 'yellow',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  'UAAD-SAE5-VSOP-AS25': {
    skin: 'yellow',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  'UAAD-WS7C-VSOP-AS18': {
    skin: 'white',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  'UAAD-ASD7-VSOP-AS25': {
    skin: 'white',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  'UAAD-SAE5-VSOP-UIR7': {
    skin: 'yellow',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  'UAAD-SAE5-SVI5-A2VD': {
    skin: 'yellow',
    text: '123\n456\naser\naser\naser\naser',
    timestamp: 1552171077000
  },
  'UAAD-SAE5-GK67-AS18': {
    skin: 'yellow',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  'UAAD-ASNA-VSOP-AS25': {
    skin: 'yellow',
    text: '123\n456\n',
    timestamp: 1552171088000
  },
  '453F-SAE5-VSOP-UIR7': {
    skin: 'yellow',
    text: '123\n456\n',
    timestamp: 1552171088000
  }
}

let NOTES_ACTIVE_DATA = {}
const SAVE_NOTES = () => {
  AsyncStorage.setItem('notesSave', JSON.stringify(NOTES_ACTIVE_DATA))
}
const ADD_NOTE = (key: string | number, note: { [x: string]: any }) => {
  NOTES_ACTIVE_DATA[key] = note
}
const REMOVE_NOTE = (key: string | number) => {
  delete NOTES_ACTIVE_DATA[key]
  SAVE_NOTES()
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    '双击您键盘上的 R 键来重新载入\n' +
    '摇晃您的手机或是按下 菜单键 来开启开发者菜单'
})

type noteInfo = {
  note: { [x: string]: any }
  rendered: (event: LayoutChangeEvent) => any
}

interface note {
  skin: string | 'yellow' | 'red' | 'green' | 'white' | 'silver'
  text: string
  timestamp: number
}

class Note extends Component<noteInfo, note> {
  constructor(props) {
    super(props)
    const info = this.props.note
    this.state = {
      ...{
        skin: 'yellow',
        text: '',
        timestamp: 0,
        height: 0
      },
      ...info
    }
  }
  render() {
    return (
      <View
        style={stylesNote[this.state.skin].container}
        onLayout={({ nativeEvent: e }) => {
          this.props.rendered(e)
        }}
      >
        <Text style={stylesNote[this.state.skin].note}>{this.state.text}</Text>
        <Text style={stylesNote[this.state.skin].timestamp}>
          {Utils.timestampToString(this.state.timestamp)}
        </Text>
      </View>
    )
  }
}

const stylesNote = {
  yellow: StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#FFFDE7',
      borderWidth: 0.5,
      borderColor: '#FFE555',
      borderRadius: 8
    },
    note: {
      color: '#C09C00',
      fontWeight: '300'
    },
    timestamp: {
      color: '#D0AC00',
      fontWeight: '300',
      fontSize: 10
    }
  }),
  white: StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderWidth: 0.5,
      borderColor: '#DDDDDD',
      borderRadius: 8
    },
    note: {
      color: '#888888',
      fontWeight: '300'
    },
    timestamp: {
      color: '#666666',
      fontWeight: '300',
      fontSize: 10
    }
  }),
  green: StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#F0FFF0',
      borderWidth: 0.5,
      borderColor: '#AAEEAA',
      borderRadius: 8
    },
    note: {
      color: '#88AA88',
      fontWeight: '300'
    },
    timestamp: {
      color: '#99BB99',
      fontWeight: '300',
      fontSize: 10
    }
  }),
  red: StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#FFF0F0',
      borderWidth: 0.5,
      borderColor: '#EEAAAA',
      borderRadius: 8
    },
    note: {
      color: '#AA8888',
      fontWeight: '300'
    },
    timestamp: {
      color: '#BB9999',
      fontWeight: '300',
      fontSize: 10
    }
  })
}

const SCREEN_WIDTH = Dimensions.get('window').width

interface MainState {
  timerText: string
  notesStyle: { [x: string]: any }
  notesInfo: { [x: string]: any }
  notesView: { [x: string]: Note }
}
type mainWindow = {}

export default class Home extends Component<mainWindow, MainState> {
  constructor(props) {
    super(props)
    this.state = {
      timerText: 'Loading...',
      notesStyle: {},
      notesInfo: {},
      notesView: {}
    }
    AsyncStorage.getItem('notesSave')
      .then(
        result => {
          if (result && result.length > 0) {
            return Promise.resolve(JSON.parse(result))
          }
          return Promise.resolve({})
        },
        err => {
          return Promise.resolve({})
        }
      )
      .then(notesInfo => {
        NOTES_ACTIVE_DATA = notesInfo
        this.setState(() => {
          return { notesInfo: notesInfo }
          // return { notesInfo: NOTES_DATA }
        })
      })
    this.props.navigation.setParams({
      realThis: this
    })
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('Reload', () =>
      this.forceUpdate()
    )
  }
  componentWillUnmount() {
    this.subscription.remove()
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: '柄家便签',
      headerRight: (
        <TouchableNativeFeedback
          onPress={() => {
            const noteKey = new Date().getTime()
            const newNote = {
              skin: 'white',
              text: '',
              timestamp: noteKey
            }
            NOTES_ACTIVE_DATA[noteKey] = newNote
            navigation.navigate('Note', {
              note: newNote,
              del: () => {
                REMOVE_NOTE(noteKey)
                SAVE_NOTES()
              },
              save: () => {
                SAVE_NOTES()
                navigation
                  .getParam('realThis')
                  .state.notesView[noteKey].setState(() => {
                    setTimeout(() => {
                      DeviceEventEmitter.emit('Reload')
                    }, 100)
                    return {
                      ...navigation.getParam('realThis').state.notesInfo[
                        noteKey
                      ]
                    }
                  })
              },
              skin: () => SAVE_NOTES() //this.forceUpdate()
            })
            SAVE_NOTES()
            navigation.getParam('realThis').forceUpdate()
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
                新建
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )
    }
  }

  getNoteStyle() {
    return {
      width: (SCREEN_WIDTH - 24) / 2,
      height: -16,
      marginTop: 4,
      marginButtom: 4,
      borderRadius: 8,
      marginLeft: 8
    }
  }

  renderNotes() {
    return Object.keys(this.state.notesInfo)
      .sort((a, b) => {
        return parseInt(b, 10) - parseInt(a, 10)
      })
      .map(notekey => {
        if (!this.state.notesStyle[notekey]) {
          setTimeout(() => {
            this.setState(prevState => {
              prevState.notesStyle[notekey] = this.getNoteStyle()
              return prevState
            })
          }, 0)
        }
        return (
          <View
            key={this.state.notesInfo[notekey]}
            style={
              this.state.notesStyle[notekey]
                ? this.state.notesStyle[notekey]
                : this.getNoteStyle()
            }
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Note', {
                  note: this.state.notesInfo[notekey],
                  del: () => {
                    REMOVE_NOTE(notekey)
                    SAVE_NOTES()
                  },
                  save: () => {
                    SAVE_NOTES()
                    this.state.notesView[notekey].setState(() => {
                      setTimeout(() => {
                        DeviceEventEmitter.emit('Reload')
                      }, 100)
                      return { ...this.state.notesInfo[notekey] }
                    })
                  },
                  skin: () => SAVE_NOTES() //this.forceUpdate()
                })
              }
              style={{ flex: 1 }}
              activeOpacity={0.8}
            >
              <Note
                note={this.state.notesInfo[notekey]}
                rendered={event => {
                  setTimeout(
                    () =>
                      this.setState(prevState => {
                        prevState.notesStyle[notekey] = this.getNoteStyle()
                        prevState.notesStyle[notekey].height =
                          event.layout.height
                        return prevState
                      }),
                    0
                  )
                }}
                ref={noteView => (this.state.notesView[notekey] = noteView)}
              />
            </TouchableOpacity>
          </View>
        )
      }, this)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'#FAFAFA'} barStyle="dark-content" />
        <View style={styles.notes}>
          <ScrollView style={styles.waterfall}>
            <AutoResponsive itemMargin={8}>{this.renderNotes()}</AutoResponsive>
          </ScrollView>
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
    backgroundColor: '#F6F6F6'
  },
  welcome: {
    flex: 0,
    fontSize: 16,
    textAlign: 'center',
    height: 48,
    backgroundColor: 'skyblue'
    // margin: 10
  },
  notes: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#333333',
    backgroundColor: '#F6F6F6'
    // marginBottom: 5
  },
  waterfall: {
    flex: 1
  },
  instruction: {
    height: 120,
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
