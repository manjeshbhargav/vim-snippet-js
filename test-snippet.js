/**
 * Respond to a "getUserScreen" request.
 * @param {Array<DesktopCaptureSourceType>} sources
 * @param {Tab} tab
 * @param {function} sendResponse
 * @returns {void}
 */
function handleGetUserScreenRequest(sources, tab, sendResponse) {
  chrome.desktop.chooseDesktopMedia(sources, tab, streamId => {
    // The user canceled our request.
    if (!streamId) {
      sendResponse({
        type: 'error',
        message: 'Failed to get stream ID'
      });
    }
    // The user accepted our request.
    sendResponse({
      type: 'success',
      streamId: streamId
    });
  });
}
