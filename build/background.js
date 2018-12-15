console.log('background script running...')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg === 'popupReady') {
    console.log('popup is ready')

    getApps().then(data => {
      sendResponse({ userApps: data })
    })
    return true
  } else if (request.msg === 'setEnabled') {
    setEnabled(request.id, request.enabled)
    return true
  }
})

const getApps = () => {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(data => {
      return resolve(data)
    })
  })
}

const setEnabled = (id, enabled) => {
  console.log(id, enabled)
  chrome.management.setEnabled(id, enabled)
}
