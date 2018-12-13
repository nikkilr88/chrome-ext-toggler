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
      style={props.enabled ? enabled : notEnabled}
      className="appInfo"
      key={props.id}
      id={props.id}
    >
      <img className="icon" src={props.icon} />
      {props.name}
    </li>
  )
}

export default AppInfo
