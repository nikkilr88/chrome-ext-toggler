import React, { Component } from 'react'

export const ExtensionContext = React.createContext()

export class ExtensionProvider extends Component {
  state = {
    apps: [],
    extensions: [],
    loading: true
  }

  // Get all apps and extensions
  getApps = () => {
    chrome.runtime.sendMessage({ msg: 'popupReady' }, res => {
      this.setState(() => ({
        apps: res.userApps.filter(el => el.type === 'hosted_app'),
        extensions: this.orderApps(res.userApps).filter(
          el => el.type === 'extension' && el.name !== 'switchr'
        ),
        loading: false
      }))
    })
  }

  // Enable and disable extensions
  setEnabled = (id, enabled, index) => {
    chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled }, res => {
      console.log('sending set enabled message')
    })
    this.updateAppState(index, enabled)
  }

  // Update state with enabled status
  updateAppState = (index, enabled) => {
    const updatedExtensions = this.state.extensions
    updatedExtensions[index].enabled = enabled

    this.setState(() => ({
      extensions: this.orderApps(updatedExtensions)
    }))
  }

  // Disable all extensions
  disableAll = () => {
    const enabled = this.state.extensions.filter(ext => ext.enabled)

    for (let el of enabled) {
      let id = el.id
      let enabled = false
      let index = this.state.extensions.findIndex(obj => obj.id === id)

      chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled }, res => {
        console.log('sending set enabled message')
      })
      this.updateAppState(index, enabled)
    }
  }

  // Order extensions and apps by enabled state and name
  orderApps = extensions => {
    return extensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.enabled - a.enabled)
  }

  componentDidMount() {
    this.getApps()
  }

  render() {
    return (
      <ExtensionContext.Provider
        value={{
          ...this.state,
          setEnabled: this.setEnabled,
          updateAppState: this.updateAppState,
          disableAll: this.disableAll
        }}
      >
        {this.props.children}
      </ExtensionContext.Provider>
    )
  }
}
