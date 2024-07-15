function detectTextSelection() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            type: 'textSelection',
            data: selectedText
        });
    }
}

document.addEventListener('mouseup', detectTextSelection);