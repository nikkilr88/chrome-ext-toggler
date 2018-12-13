console.log('background script running...')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.msg === 'popupReady') {
    console.log('popup is ready')

    getApps().then(data => {
      sendResponse({ userApps: data })
    })
    return true
  }
})

function getApps() {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(data => {
      return resolve(data)
    })
  })
}
