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
    this.getApps()
  }

  getApps() {
    chrome.runtime.sendMessage({ msg: 'popupReady' }, res => {
      this.setState(() => ({
        apps: res.userApps.filter(el => el.type === 'hosted_app'),
        extensions: res.userApps.filter(el => el.type === 'extension')
      }))
    })
  }

  render() {
    console.log({ state: this.state })

    const extensions = this.state.extensions.map((ext, i) => (
      <AppInfo
        id={ext.id}
        key={ext.id}
        icon={ext.icons ? ext.icons[0].url : ''}
        name={ext.name}
        enabled={ext.enabled}
      />
    ))

    return (
      <div className="container">
        <Header />
        <ul>
          <h3>Extensions</h3>
          {extensions}
        </ul>
      </div>
    )
  }
}

export default App
