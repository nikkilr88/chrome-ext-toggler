import React, { Component } from 'react'

export const ExtensionContext = React.createContext()

export class ExtensionProvider extends Component {
  state = {
    apps: [],
    extensions: [],
    loading: true,
    searchValue: '',
    showSearch: false
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
    this.updateAppState(id, enabled)
  }

  // Update state with enabled status
  updateAppState = (id, enabled) => {
    const updatedExtensions = this.state.extensions
    updatedExtensions.find(obj => obj.id === id).enabled = enabled

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

      chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled }, res => {
        console.log('sending set enabled message')
      })
      this.updateAppState(id, enabled)
    }
  }

  // Order extensions and apps by enabled state and name
  orderApps = extensions => {
    return extensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.enabled - a.enabled)
  }

  handleSearch = e => {
    const searchValue = e.target.value
    this.setState(() => ({
      searchValue
    }))
  }

  toggleSearch = () => {
    this.setState(prevState => ({
      searchValue: '',
      showSearch: !prevState.showSearch
    }))
  }

  render() {
    return (
      <ExtensionContext.Provider
        value={{
          ...this.state,
          getApps: this.getApps,
          orderApps: this.orderApps,
          setEnabled: this.setEnabled,
          updateAppState: this.updateAppState,
          disableAll: this.disableAll,
          handleSearch: this.handleSearch,
          toggleSearch: this.toggleSearch
        }}
      >
        {this.props.children}
      </ExtensionContext.Provider>
    )
  }
}
