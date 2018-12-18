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
      {({ loading, disableAll, setEnabled, extensions }) => (
        <App
          loading={loading}
          disableAll={disableAll}
          setEnabled={setEnabled}
          extensions={extensions}
        />
      )}
    </ExtensionContext.Consumer>
  </ExtensionProvider>,
  document.getElementById('root')
)
