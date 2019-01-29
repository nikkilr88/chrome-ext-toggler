import React from 'react'
import AppInfoWrapper from './AppInfoWrapper'
import { ExtensionContext } from '../../contexts/ExtensionContext'

export default () => (
  <ExtensionContext.Consumer>
    {({ extensions, disableAll, showSearch }) => (
      <AppInfoWrapper
        extensions={extensions}
        disableAll={disableAll}
        showSearch={showSearch}
      />
    )}
  </ExtensionContext.Consumer>
)
