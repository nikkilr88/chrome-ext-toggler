import React, { Component, Fragment } from 'react'
import Header from './Header'
import AppInfo from './AppInfo'

class App extends Component {
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
        extensions: res.userApps
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(el => el.type === 'extension' && el.name !== 'switchr'),
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
      extensions: updatedExtensions
    }))
  }

  // Disable all extensions
  disableAll = extensions => {
    const enabled = extensions.filter(ext => ext.enabled)

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

  componentDidMount() {
    this.getApps()
  }

  render() {
    const extensionList = this.state.extensions.map((ext, i) => (
      <AppInfo key={i} index={i} setEnabled={this.setEnabled} ext={ext} />
    ))

    return (
      <Fragment>
        {!this.state.loading && (
          <div className="container">
            <Header />
            <ul>
              <div className="section-title">
                <h3>Extensions</h3>
                <span
                  className="turn-off"
                  onClick={() => this.disableAll(this.state.extensions)}
                >
                  Disable all
                </span>
              </div>

              {extensionList}
            </ul>
          </div>
        )}
      </Fragment>
    )
  }
}

export default App
