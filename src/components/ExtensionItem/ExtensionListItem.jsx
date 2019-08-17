import React, { Component, useContext } from 'react'
import { ExtensionContext } from '../../contexts/ExtensionContext'
import { StyledExtensionListItem } from './ExtensionListItem.styles'

import Cog from '../../images/cog.png'

const ExtensionItem = ({ tabIndex, ext, index }) => {
  const { setEnabled } = useContext(ExtensionContext)

  return (
    <StyledExtensionListItem
      tabIndex={tabIndex}
      enabled={ext.enabled}
      onKeyDown={e => e.which === 13 && setEnabled(ext.id, !ext.enabled)}
      onClick={e => {
        if (e.target.classList.contains('cog')) return
        setEnabled(ext.id, !ext.enabled)
      }}
    >
      <img className="icon" src={ext.icons ? ext.icons[0].url : ''} />

      <span className="name">{ext.name}</span>

      {ext.enabled && ext.optionsUrl && (
        <i
          className="cog-wrapper"
          onClick={() => chrome.tabs.create({ url: ext.optionsUrl })}
        >
          <img className="cog" src={Cog} alt="settings" />
        </i>
      )}
    </StyledExtensionListItem>
  )
}

export default ExtensionItem
