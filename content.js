document.addEventListener('mouseup', detectTextSelection);
document.addEventListener('oncontextmenu', onContextMenuOpen);
injectScriptLoader();


// *************************** //

function injectScriptLoader() {
    let script = document.createElement('script');
    script.type = "text/javascript"
    script.id = 'extension-url';
    script.innerHTML= chrome.runtime.getURL('');
    script.src = chrome.runtime.getURL('scripts/load.script.js');
    script.onload = () => {
    };
    (document.head || document.documentElement).appendChild(script);
}

function detectTextSelection() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            type: 'textSelection',
            data: selectedText
        });
        chrome.runtime.sendMessage({
            type: 'test',
            data: selectedText
        });
    }
}

function onContextMenuOpen() {
    chrome.runtime.sendMessage({
        type: 'oncontextmenu',
        data: window.location.href
    });
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'hide') {
        const element = document.getElementById(request.elementId);
        if (element) {
            element.style.display = 'none';
            localStorage.setItem("quickMenu", 'hide');
        }
    }

    if (request.action === 'show') {
        const element = document.getElementById(request.elementId);
        if (element) {
            element.style.display = 'flex';
            localStorage.setItem("quickMenu", 'show');

        }
    }


});