import React, { Component, Fragment } from 'react'

import Header from './Header'
import AppInfo from './AppInfo'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      apps: [],
      extensions: []
    }

    this.getApps = this.getApps.bind(this)
  }

  componentDidMount() {
    console.log('Mounted')
    this.getApps()
  }

  getApps() {
    chrome.runtime.sendMessage({ msg: 'popupReady' }, res => {
      this.setState(() => ({
        apps: res.userApps.filter(el => el.isApp),
        extensions: res.userApps.filter(el => !el.isApp)
      }))
    })
  }

  render() {
    console.log(this.state)

    const extensions = this.state.extensions.map((ext, i) => (
      <AppInfo
        key={i}
        // icon={ext.icons[0]}
        name={ext.name}
        enabled={ext.enabled}
      />
    ))

    return (
      <Fragment>
        <Header />
        <ul>{extensions}</ul>
      </Fragment>
    )
  }
}

export default App
