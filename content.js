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

document.addEventListener('mouseup', detectTextSelection);
document.addEventListener('oncontextmenu', onContextMenuOpen);

if (window.location.href.includes('/mantis/view.php?id=') || window.location.href.includes('/mantis/bugnote_edit_page.php?bugnote_id')) {

    const script = document.createElement('script');
    script.type = "text/javascript"
    script.src = chrome.runtime.getURL('tinymce/tinymce.min.js');
    script.onload = () => {
    };
    (document.head || document.documentElement).appendChild(script);

    setTimeout(() => {
        const script2 = document.createElement('script');
        script2.type = "text/javascript"
        script2.src = chrome.runtime.getURL('initTinymce.js');
        script2.onload = () => {
        };
        (document.head || document.documentElement).appendChild(script2);

    }, 100)
}



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'hide') {
        const element = document.getElementById(request.elementId);
        if (element) {
            element.style.display =  'none';
            localStorage.setItem("quickMenu", false);

        }
    }

    if (request.action === 'show') {
        const element = document.getElementById(request.elementId);
        if (element) {
            element.style.display = 'flex' ;
            localStorage.setItem("quickMenu", true);

        }
    }


});