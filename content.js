function detectTextSelection() {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            type: 'textSelection',
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


const script = document.createElement('script');
script.type = "text/javascript"
script.src = chrome.runtime.getURL('tinymce/tinymce.min.js');
script.onload = () => {
};
(document.head || document.documentElement).appendChild(script);

setTimeout(()=>{
    const script2 = document.createElement('script');
    script2.type = "text/javascript"
    script2.src = chrome.runtime.getURL('initTinymce.js');
    script2.onload = () => {
    };
    (document.head || document.documentElement).appendChild(script2);
},100)



