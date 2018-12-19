import React from 'react'
import Cog from '../../images/cog.png'

const AppInfo = props => {
  const notEnabled = {
    opacity: '0.5'
  }

  const enabled = {
    opacity: '1'
  }

  return (
    <li
      style={props.ext.enabled ? enabled : notEnabled}
      className="appInfo"
      onClick={e => {
        if (e.target.classList.contains('cog')) return
        props.setEnabled(props.ext.id, !props.ext.enabled)
      }}
    >
      <img
        className="icon"
        src={props.ext.icons ? props.ext.icons[0].url : ''}
      />

      <span className="name">{props.ext.name}</span>

      {props.ext.enabled && props.ext.optionsUrl && (
        <span
          className="cog-wrapper"
          onClick={() => chrome.tabs.create({ url: props.ext.optionsUrl })}
        >
          <img className="cog" src={Cog} alt="settings" />
        </span>
      )}
    </li>
  )
}

export default AppInfo
