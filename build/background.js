const getApps = () => {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(data => {
      return resolve(data)
    })
  })
}

const setEnabled = (id, enabled) => {
  chrome.management.setEnabled(id, enabled)
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.msg) {
    case 'popupReady':
      getApps().then(data => {
        sendResponse({ userApps: data })
      })
      return true

    case 'setEnabled':
      setEnabled(request.id, request.enabled)
      return true

    default:
      return
  }
})
