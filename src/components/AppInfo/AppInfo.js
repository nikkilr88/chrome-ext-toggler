import React, { Component } from 'react'
import Cog from '../../images/cog.png'

class AppInfo extends Component {
  render() {
    const notEnabled = {
      opacity: '0.5'
    }

    const enabled = {
      opacity: '1'
    }

    const listStyle = this.props.ext.enabled ? enabled : notEnabled

    return (
      <li
        tabIndex={this.props.tabIndex}
        className="appInfo"
        onClick={e => {
          if (e.target.classList.contains('cog')) return
          this.props.setEnabled(this.props.ext.id, !this.props.ext.enabled)
        }}
        onKeyDown={e =>
          e.which === 13 &&
          this.props.setEnabled(this.props.ext.id, !this.props.ext.enabled)
        }
      >
        <img
          style={listStyle}
          className="icon"
          src={this.props.ext.icons ? this.props.ext.icons[0].url : ''}
        />

        <span style={listStyle} className="name">
          {this.props.ext.name}
        </span>

        {this.props.ext.enabled && this.props.ext.optionsUrl && (
          <span
            className="cog-wrapper"
            onClick={() =>
              chrome.tabs.create({ url: this.props.ext.optionsUrl })
            }
          >
            <img className="cog" src={Cog} alt="settings" />
          </span>
        )}
      </li>
    )
  }
}

export default AppInfo
