import React, { useState, useEffect } from 'react'

export const ExtensionContext = React.createContext()

export const ExtensionProvider = props => {
  const [showSearch, setShowSearch] = useState(false)
  const [extensions, setExtensions] = useState([])

  // Get all apps and extensions
  const getApps = () => {
    // Todo - Add in apps (el.type === 'hosted_app')
    chrome.runtime.sendMessage({ msg: 'popupReady' }, res => {
      const extensions = res.userApps.filter(
        app => app.type === 'extension' && app.name !== 'switchr'
      )

      setExtensions(orderApps(extensions))
    })
  }

  // Enable and disable extensions
  const setEnabled = (id, enabled) => {
    chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled })
    updateAppState(id, enabled)
  }

  // Update state with enabled status
  const updateAppState = (id, enabled) => {
    const updatedExtensions = [...extensions]
    updatedExtensions.find(ext => ext.id === id).enabled = enabled

    setExtensions(orderApps(updatedExtensions))
  }

  // Disable all extensions
  const disableAll = () => {
    const enabled = extensions.filter(ext => ext.enabled)

    for (let el of enabled) {
      let id = el.id
      let enabled = false

      chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled })
      updateAppState(id, enabled)
    }
  }

  // Order extensions and apps by name then enabled state
  const orderApps = prevExtensions => {
    return prevExtensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => b.enabled - a.enabled)
  }

  // Toggle search visiblity
  const toggleSearch = event => {
    if (event.ctrlKey && event.which === 70) {
      setShowSearch(showSearch => !showSearch)
    }
  }

  useEffect(() => {
    getApps()

    document.addEventListener('keyup', toggleSearch, false)
  }, [])

  return (
    <ExtensionContext.Provider
      value={{
        showSearch,
        extensions,
        disableAll,
        setEnabled,
        updateAppState
      }}
    >
      {props.children}
    </ExtensionContext.Provider>
  )
}
