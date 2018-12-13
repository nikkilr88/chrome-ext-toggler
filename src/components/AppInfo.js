import React from 'react'

const AppInfo = props => {
  const notEnabled = {
    color: '#999'
  }
  const enabled = {
    color: '#333'
  }

  return (
    <li
      style={props.enabled ? enabled : notEnabled}
      className="appInfo"
      key={props.key}
    >
      {props.name}
    </li>
  )
}

export default AppInfo
