chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "gotoSelectedMITS",
        title: "Go to Selected MITS",
        contexts: ["all"],
        visible: false
    });

    chrome.contextMenus.create({
        id: "gotoFirstNote",
        title: "First Note",
        contexts: ["all"],
        visible: false
    });
    chrome.contextMenus.create({
        id: "gotoLastNote",
        title: "Last Note",
        contexts: ["all"],
        visible: false
    });
    chrome.contextMenus.create({
        id: "pasteNoteId",
        title: "Paste Note Id",
        contexts: ["link"],
        visible: true
    });
    chrome.contextMenus.create({
        id: "enableRichText",
        title: "Enable Rich Text",
        contexts: ["all"],
        visible: false
    });
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('/mantis/view.php?id=')) {
        chrome.contextMenus.update("gotoLastNote", {
            visible: true
        });
        chrome.contextMenus.update("gotoFirstNote", {
            visible: true
        });
        chrome.contextMenus.update("pasteNoteId", {
            visible: true
        });

    } else {
        chrome.contextMenus.update("gotoLastNote", {
            visible: false
        });
        chrome.contextMenus.update("gotoFirstNote", {
            visible: false
        });
        chrome.contextMenus.update("pasteNoteId", {
            visible: false
        });
    }


});
chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, tab => {

        if (tab.url.includes('/mantis/view.php?id=')) {
            chrome.contextMenus.update("gotoFirstNote", {
                visible: true
            });
            chrome.contextMenus.update("gotoLastNote", {
                visible: true
            });
        } else {
            chrome.contextMenus.update("gotoFirstNote", {
                visible: false
            });
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
        chrome.tabs.create({ url: url });
    }

    if (info.menuItemId === "gotoFirstNote") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: navigateToFirstNote,
            args: ['']
        });
    }
    if (info.menuItemId === "gotoLastNote") {
        const urlObj = new URL(tab.url);
        const id = urlObj.searchParams.get('id');
        const selectedText = encodeURIComponent(info.selectionText);
        const url = `http://192.168.1.126:1234/mantis/view.php?id=${id}&#addbugnote`;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: navigateToLastNote,
            args: ['']
        });
    }

    if (info.menuItemId === "pasteNoteId") {
        const linkURL = info.linkUrl;
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: pasteText,
            args: [linkURL]
        });
    }

});


function navigateToFirstNote(link) {
    let element = document.querySelectorAll('.bugnote')[0]
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
function navigateToLastNote(link) {
    let element = document.querySelectorAll('.bugnote')[document.querySelectorAll('.bugnote').length - 2]
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
function pasteText(link) {

    let noteId = '';
    const regex = /#c(\d+)$/;
    const match = link.match(regex);
    if (match && match[1]) {
        noteId = '~' + match[1];
    }

    let iframe = document.getElementById('mytextarea_ifr');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    let editorBody = iframeDocument.getElementById('tinymce');
    editorBody.innerHTML += noteId

}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'textSelection') {
        var selectedText = message.data;
        if (selectedText) {
            const matchArray = selectedText.match(/MITS_(\d+)/g);
            const firstMatch = matchArray && matchArray.length ? matchArray[0] : 0;
            if (firstMatch) {
                chrome.contextMenus.update("gotoSelectedMITS", {
                    title: "Go to " + firstMatch,
                    visible: true
                });
            } else {
                chrome.contextMenus.update("gotoSelectedMITS", {
                    visible: false
                });
            }
        }

    }


    if (message.type === 'oncontextmenu') {
        const url = message.data;
        if (url.includes('/mantis/view.php?id=')) {
            chrome.contextMenus.update("pasteNoteId", {
                visible: true
            });
        } else {
            chrome.contextMenus.update("pasteNoteId", {
                visible: false
            });
        }


    }


});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            chrome.runtime.sendMessage({ action: "makeRichTextEditor" });
        }
    });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});