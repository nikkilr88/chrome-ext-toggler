import React from 'react'

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
      onClick={() => {
        props.setEnabled(props.ext.id, !props.ext.enabled, props.index)
      }}
    >
      <img
        className="icon"
        src={props.ext.icons ? props.ext.icons[0].url : ''}
      />
      {props.ext.name}
    </li>
  )
}

export default AppInfo
