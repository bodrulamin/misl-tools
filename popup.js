// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const quickMenutoggle = document.getElementById('quickMenutoggle');
    chrome.storage.local.get('toggleState', function (data) {
        console.log(data.toggleState);
        if (data.toggleState === true || data.toggleState === false) {

        } else {
            data.toggleState = true;
        }

        console.log(data.toggleState);
        quickMenutoggle.checked = data.toggleState

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: quickMenutoggle.checked ? 'show' : 'hide',
                elementId: 'quickMenu'  // Replace with the ID of the element you want to show/hide
            });

        });
    });

    quickMenutoggle.addEventListener('change', function () {
        chrome.storage.local.set({ 'toggleState': quickMenutoggle.checked }, function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: quickMenutoggle.checked ? 'show' : 'hide',
                    elementId: 'quickMenu'  // Replace with the ID of the element you want to show/hide
                });
            });
        });
    });
});
