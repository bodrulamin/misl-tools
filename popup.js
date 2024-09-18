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

    const url = 'https://raw.githubusercontent.com/bodrulamin/misl-tools/master/version.json'; // Replace with your API endpoint

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        
        return response.text(); // Parse the JSON from the response
      })
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });


});
