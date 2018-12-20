import React from 'react'
import AppInfoWrapper from './AppInfoWrapper'
import { ExtensionContext } from '../../contexts/ExtensionContext'

export default () => (
  <ExtensionContext.Consumer>
    {({ extensions, disableAll, showSearch, toggleSearch }) => (
      <AppInfoWrapper
        extensions={extensions}
        disableAll={disableAll}
        showSearch={showSearch}
        toggleSearch={toggleSearch}
      />
    )}
  </ExtensionContext.Consumer>
)
