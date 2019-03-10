/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView,
  Dimensions
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
  onLayout: ({ nativeEvent: e }: { nativeEvent: any }) => any
}

interface note {
  skin: 'yellow' | 'red' | 'green' | 'white' | 'silver'
  text: string
  timestamp: number
}

class Note extends Component<noteInfo, note> {
  constructor(props) {
    super(props)
  }
  render() {
    const key = this.props.notekey
    const info = NOTES_DATA[key]
    const timeText = new Date(info.timestamp).toLocaleString()
    return (
      <View style={stylesNote[info.skin].container}>
        <Text style={stylesNote[info.skin].note}>{info.text}</Text>
        <Text style={stylesNote[info.skin].timestamp}>{timeText}</Text>
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
      color: '#D0AC00',
      fontWeight: '500'
    },
    timestamp: {
      color: '#D0AC00',
      fontWeight: '300'
    }
  })
}

type titleBar = {
  text: string
  leftButton: Component | null | undefined
  rightButton: Component | null | undefined
}

class TitleBar extends Component<titleBar> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.titleBar}>
        <Text style={styles.titleBarText}>{this.props.text}</Text>
      </View>
    )
  }
}

let stylesWaterfall = StyleSheet.create({
  container: {
    backgroundColor: '#301711'
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20
  },
  titleText: {
    color: '#d0bbab',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold'
  },
  text: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: 'rgb(58, 45, 91)'
  }
})

const SCREEN_WIDTH = Dimensions.get('window').width

class Waterfall extends React.Component {
  state = {
    array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  getChildrenStyle() {
    return {
      width: (SCREEN_WIDTH - 18) / 2,
      height: ((Math.random() * 20 + 12) >> 0) * 10,
      backgroundColor: 'rgb(92, 67, 155)',
      paddingTop: 20,
      borderRadius: 8
    }
  }

  getAutoResponsiveProps() {
    return {
      itemMargin: 8
    }
  }

  renderChildren() {
    return this.state.array.map((i, key) => {
      return (
        <View style={this.getChildrenStyle()} key={key}>
          <Text style={stylesWaterfall.text}>{i}</Text>
        </View>
      )
    }, this)
  }

  onPressTitle = () => {
    this.setState({
      array: [...this.state.array, (Math.random() * 30) >> 0]
    })
  }

  render() {
    return (
      <ScrollView style={stylesWaterfall.container}>
        <View style={stylesWaterfall.title}>
          <Text onPress={this.onPressTitle} style={stylesWaterfall.titleText}>
            autoresponsive
          </Text>
        </View>
        <AutoResponsive {...this.getAutoResponsiveProps()}>
          {this.renderChildren()}
        </AutoResponsive>
      </ScrollView>
    )
  }
}

interface MainState {
  timerText: string
  notes: { [x: string]: any }
}
type mainWindow = {}
export default class App extends Component<mainWindow, MainState> {
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
        this.setState(previousState => {
          return { timerText: timer.toString(10) }
        })
        setInterval(() => {
          timer++
          AsyncStorage.setItem('AppTimeCounter', timer.toString(10))
          // this.setState(previousState => {
          //   return { timerText: timer.toString(10) }
          // })
        }, 1000)
      })
  }

  state = {
    timerText: 'Loading...',
    notes: {}
  }

  getNoteStyle() {
    return {
      width: (SCREEN_WIDTH - 24) / 2,
      height: 1000,
      marginTopgTop: 16,
      borderRadius: 8,
      marginLeft: 8
    }
  }

  renderNotes() {
    return Object.keys(NOTES_DATA).map(notekey => {
      if (!this.state.notes[notekey]) {
        this.setState(prevState => {
          prevState.notes[notekey] = this.getNoteStyle()
          return prevState
        })
      }
      return (
        <View
          style={
            this.state.notes[notekey]
              ? this.state.notes[notekey]
              : this.getNoteStyle()
          }
        >
          <Text>
            {this.state.notes[notekey] ? this.state.notes[notekey].height : 'F'}
          </Text>
          <Note
            notekey={notekey}
            onLayout={({ nativeEvent: e }) => {
              if (this.state.notes[notekey].height != e.height) {
                setTimeout(() => {
                  this.setState(prevState => {
                    prevState.notes[notekey].height = e.height
                    return prevState
                  })
                }, 0)
              }
            }}
          />
        </View>
      )
    }, this)
  }

  render() {
    return (
      <View style={styles.container}>
        <TitleBar text="柄家便签" leftButton={null} rightButton={null} />
        <View style={styles.instruction}>
          <ScrollView>
            <AutoResponsive itemMargin={8}>{this.renderNotes()}</AutoResponsive>
          </ScrollView>
        </View>
        <View style={styles.instruction}>
          <Text style={styles.instructions}>要开始，请编辑 App.js</Text>
          <Text style={styles.instructions}>{this.state.timerText}</Text>
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
