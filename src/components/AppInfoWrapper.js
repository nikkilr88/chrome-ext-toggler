import React, { Component } from 'react'
import AppInfo from './AppInfo'

class AppInfoWrapper extends Component {
  render() {
    const extensionList = this.props.extensions.map((ext, i) => (
      <AppInfo key={i} index={i} ext={ext} setEnabled={this.props.setEnabled} />
    ))
    return (
      <ul>
        <div className="section-title">
          <h3>Extensions</h3>
          <span className="turn-off" onClick={() => this.props.disableAll()}>
            Disable all
          </span>
        </div>

        {extensionList}
      </ul>
    )
  }
}

export default AppInfoWrapper
