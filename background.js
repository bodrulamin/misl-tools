chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "gotoSelectedMITS",
        title: "Go to Selected MITS",
        contexts: ["all"],
        visible: false
    });

    chrome.contextMenus.create({
        id: "gotoLastNote",
        title: "Go to LastNote",
        contexts: ["all"],
        visible: false
    });
    chrome.contextMenus.create({
        id: "pasteNoteId",
        title: "Past Note Id",
        contexts: ["all"],
        visible: true
    });
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('/mantis/view.php?id=')) {
        chrome.contextMenus.update("gotoLastNote", {
            visible: true
        });
    } else {
        chrome.contextMenus.update("gotoLastNote", {
            visible: false
        });
    }


});
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab.url.includes('/mantis/view.php?id=')) {
            chrome.contextMenus.update("gotoLastNote", {
                visible: true
            });
        } else {
            chrome.contextMenus.update("gotoLastNote", {
                visible: false
            });
        }
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "gotoSelectedMITS") {

        const mitsNumber = info.selectionText.match(/\d+/)[0];
        const url = `http://192.168.1.126:1234/mantis/view.php?id=${mitsNumber}`;
        chrome.tabs.create({url: url});
    }

    if (info.menuItemId === "gotoLastNote") {
        const urlObj = new URL(tab.url);
        const id = urlObj.searchParams.get('id');
        const selectedText = encodeURIComponent(info.selectionText);
        const url = `http://192.168.1.126:1234/mantis/view.php?id=${id}&#addbugnote`;
        // chrome.tabs.create({ url: url });
        chrome.tabs.update(tab.id, {url: url});
    }
    if (info.menuItemId === "pasteNoteId") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: pasteText,
        });
    }
});

// function pasteText() {
//     navigator.clipboard.readText().then((clipText) => {
//         document.activeElement.value = clipText;
//     });
// }

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'textSelection') {
        var selectedText = message.data;
        if (selectedText) {
            const matchArray = selectedText.match(/(00)?\d{5}/g);
            const firstMatch = matchArray && matchArray.length ? matchArray[0] : 0;
            if (firstMatch) {
                chrome.contextMenus.update("gotoSelectedMITS", {
                    title: "Go to MITS " + firstMatch,
                    visible: true
                });
            } else {
                chrome.contextMenus.update("gotoSelectedMITS", {
                    visible: false
                });
            }
        }
    }
});