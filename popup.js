// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const quickMenutoggle = document.getElementById('quickMenutoggle');
    chrome.storage.local.get('toggleState', function (data) {
        console.log(data.toggleState);
        if(data.toggleState === undefined){
            data.toggleState = true;
        }
        quickMenutoggle.checked = data.toggleState || false;
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
