import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {
  ExtensionProvider,
  ExtensionContext
} from './contexts/ExtensionContext.jsx'

ReactDOM.render(
  <ExtensionProvider>
    <App />
  </ExtensionProvider>,
  document.getElementById('root')
)
