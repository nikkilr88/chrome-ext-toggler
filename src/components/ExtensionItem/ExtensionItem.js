import React, { Component, useContext } from 'react'
import { ExtensionContext } from '../../contexts/ExtensionContext'

import Cog from '../../images/cog.png'

const ExtensionItem = ({ tabIndex, ext, index }) => {
  const { setEnabled } = useContext(ExtensionContext)

  const notEnabled = {
    opacity: '0.5'
  }

  const enabled = {
    opacity: '1'
  }

  const listStyle = ext.enabled ? enabled : notEnabled

  return (
    <li
      tabIndex={tabIndex}
      className="appInfo"
      onClick={e => {
        if (e.target.classList.contains('cog')) return
        setEnabled(ext.id, !ext.enabled)
      }}
      onKeyDown={e => e.which === 13 && setEnabled(ext.id, !ext.enabled)}
    >
      <img
        style={listStyle}
        className="icon"
        src={ext.icons ? ext.icons[0].url : ''}
      />

      <span style={listStyle} className="name">
        {ext.name}
      </span>

      {ext.enabled && ext.optionsUrl && (
        <span
          className="cog-wrapper"
          onClick={() => chrome.tabs.create({ url: ext.optionsUrl })}
        >
          <img className="cog" src={Cog} alt="settings" />
        </span>
      )}
    </li>
  )
}

export default ExtensionItem
