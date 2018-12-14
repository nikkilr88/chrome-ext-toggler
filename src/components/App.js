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
      display: 'block'
    }

    const hide = {
      display: 'none'
    }

    const extensionList = this.state.extensions.map((ext, i) => (
      <AppInfo key={i} index={i} setEnabled={this.setEnabled} ext={ext} />
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
