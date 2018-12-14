import React, { Component, Fragment } from 'react'
import Header from './Header'
import AppInfo from './AppInfo'

class App extends Component {
  state = {
    apps: [],
    extensions: [],
    loading: true
  }

  getApps = () => {
    chrome.runtime.sendMessage({ msg: 'popupReady' }, res => {
      this.setState(() => ({
        apps: res.userApps.filter(el => el.type === 'hosted_app'),
        extensions: res.userApps
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(el => el.type === 'extension' && el.name !== 'switchr'),
        loading: false
      }))
    })
  }

  setEnabled = (id, enabled, index) => {
    chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled }, res => {
      console.log('sending set enabled message')
    })
    this.updateAppState(index, enabled)
  }

  updateAppState = (index, enabled) => {
    const updatedExtensions = this.state.extensions
    updatedExtensions[index].enabled = enabled

    this.setState(() => ({
      extensions: updatedExtensions
    }))
  }

  componentDidMount() {
    this.getApps()
  }

  render() {
    const show = {
      display: 'block',
      opacity: '1'
    }

    const hide = {
      display: 'none',
      opacity: '0'
    }

    const extensionList = this.state.extensions.map((ext, i) => (
      <AppInfo
        id={ext.id}
        key={i}
        index={i}
        icon={ext.icons ? ext.icons[0].url : ''}
        name={ext.name}
        enabled={ext.enabled}
        setEnabled={this.setEnabled}
      />
    ))

    return (
      <div className="container" style={this.state.loading ? hide : show}>
        <Header />
        <ul>
          <h3 className="section-title">Extensions</h3>
          {extensionList}
        </ul>
      </div>
    )
  }
}

export default App
