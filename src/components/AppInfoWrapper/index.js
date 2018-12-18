import React from 'react'
import AppInfoWrapper from './AppInfoWrapper'
import { ExtensionContext } from '../../contexts/ExtensionContext'

export default () => (
  <ExtensionContext.Consumer>
    {({ extensions, disableAll }) => (
      <AppInfoWrapper extensions={extensions} disableAll={disableAll} />
    )}
  </ExtensionContext.Consumer>
)
