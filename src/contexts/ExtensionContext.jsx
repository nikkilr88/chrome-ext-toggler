import React, { Component, useState, useEffect } from 'react'

export const ExtensionContext = React.createContext()

export const ExtensionProvider = props => {
  // const [apps, setApps] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [extensions, setExtensions] = useState([])

  // Get all apps and extensions
  const getApps = () => {
    chrome.runtime.sendMessage({ msg: 'popupReady' }, res => {
      // setApps(res.userApps.filter(el => el.type === 'hosted_app'))
      setExtensions(
        orderApps(res.userApps).filter(
          el => el.type === 'extension' && el.name !== 'switchr'
        )
      )
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
    updatedExtensions.find(obj => obj.id === id).enabled = enabled

    setExtensions(orderApps(updatedExtensions))
  }

  // Disable all extensions
  const disableAll = () => {
    const enabled = extensions.filter(ext => ext.enabled)

    for (let el of enabled) {
      let id = el.id
      let enabled = false

      chrome.runtime.sendMessage({ msg: 'setEnabled', id, enabled }, res => {
        console.log('sending set enabled message')
      })
      updateAppState(id, enabled)
    }
  }

  // Order extensions and apps by enabled state and name
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
