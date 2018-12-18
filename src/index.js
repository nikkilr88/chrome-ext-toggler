import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {
  ExtensionProvider,
  ExtensionContext
} from './contexts/ExtensionContext.jsx'

ReactDOM.render(
  <ExtensionProvider>
    <ExtensionContext.Consumer>
      {({ loading, getApps }) => <App loading={loading} getApps={getApps} />}
    </ExtensionContext.Consumer>
  </ExtensionProvider>,
  document.getElementById('root')
)
