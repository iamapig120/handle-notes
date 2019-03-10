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
  TouchableOpacity
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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    '双击您键盘上的 R 键来重新载入\n' +
    '摇晃您的手机或是按下 菜单键 来开启开发者菜单'
})

type noteInfo = {
  notekey: string
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
    const key = this.props.notekey
    const info = NOTES_DATA[key]
    this.state = { ...this.state, ...info }
  }
  state = {
    skin: 'yellow',
    text: '',
    timestamp: 0,
    height: 0
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
  })
}

type titleBar = {
  text: string
  leftButton: Component | null | undefined
  rightButton: Component | null | undefined
}

const SCREEN_WIDTH = Dimensions.get('window').width

interface MainState {
  timerText: string
  notes: { [x: string]: any }
}
type mainWindow = {}
export default class Home extends Component<mainWindow, MainState> {
  constructor(props) {
    super(props)
    AsyncStorage.getItem('AppTimeCounter')
      .then(
        result => {
          return Promise.resolve(parseInt(result, 10))
        },
        err => {
          return Promise.resolve(0)
        }
      )
      .then(startNumber => {
        let timer = Number.isInteger(startNumber) ? startNumber : 0
        // this.setState(previousState => {
        //   return { timerText: timer.toString(10) }
        // })
        setInterval(() => {
          timer++
          AsyncStorage.setItem('AppTimeCounter', timer.toString(10))
          // this.setState(previousState => {
          //   return { timerText: timer.toString(10) }
          // })
        }, 1000)
      })
  }

  static navigationOptions = {
    title: '柄家便签'
  }

  state = {
    timerText: 'Loading...',
    notes: {}
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
    return Object.keys(NOTES_DATA).map(notekey => {
      if (!this.state.notes[notekey]) {
        setTimeout(() => {
          this.setState(prevState => {
            prevState.notes[notekey] = this.getNoteStyle()
            return prevState
          })
        }, 0)
      }
      return (
        <View
          key={notekey}
          style={
            this.state.notes[notekey]
              ? this.state.notes[notekey]
              : this.getNoteStyle()
          }
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Note')}
          >
            <Note
              notekey={notekey}
              rendered={event => {
                setTimeout(
                  () =>
                    this.setState(prevState => {
                      prevState.notes[notekey] = this.getNoteStyle()
                      prevState.notes[notekey].height = event.layout.height
                      return prevState
                    }),
                  0
                )
              }}
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
        {/* <View style={styles.instruction}>
          <Text style={styles.instructions}>要开始，请编辑 App.js</Text>
          <Text style={styles.instructions}>{this.state.timerText}</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View> */}
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
