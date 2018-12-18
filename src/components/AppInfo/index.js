import React from 'react'
import AppInfo from './AppInfo'
import { ExtensionContext } from '../../contexts/ExtensionContext'

export default props => (
  <ExtensionContext.Consumer>
    {({ setEnabled }) => <AppInfo {...props} setEnabled={setEnabled} />}
  </ExtensionContext.Consumer>
)
