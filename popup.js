var version = 11;

localStorage.setItem("version", version);

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

    fetchVersionInfo();

    var gotoMITSBtn = document.getElementById('gotoMITSBtn');
    var mitsNumberInput = document.getElementById('mitsNumberInput');

    mitsNumberInput.onkeydown = function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            // Enter key is pressed, execute your logic here
            console.log('Enter key pressed!');
            gotoToMits();
            // You can also prevent the default action if needed
            event.preventDefault();
        }
    };

    gotoMITSBtn.onclick = gotoToMits;
    function gotoToMits() {
        const mitsNumber = mitsNumberInput.value;
        if (!mitsNumber) return;
        const url = `http://192.168.1.126:1234/mantis/view.php?id=${mitsNumber}`;
        chrome.tabs.create({ url: url });
    }
  
});

function fetchVersionInfo() {
    const url = 'https://raw.githubusercontent.com/bodrulamin/misl-tools/master/version.json'; // Replace with your API endpoint

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            console.log(data);
            if (+localStorage.getItem('version') < data.version) {
                var updateAlert = document.getElementById('updateAlert');
                updateAlert.classList.remove('d-none');
                updateAlert.classList.add('d-block');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
