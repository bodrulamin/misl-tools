var extensionUrl = document.getElementById('extension-url').innerHTML;

if (needEditor()) {
    injectScript('resources/tinymce/tinymce.min.js');
    injectScript('resources/scripts/init.tinymce.js',100);
}

if (window.location.href.includes('/view.php?id=')) {
    injectScript('resources/scripts/quick.menu.js');
}
if (window.location.href.includes('bug_update_page.php')) {
    injectScript('resources/scripts/date.input.js');
}

function injectScript(relativeUrl, delay = 0) {
    setTimeout(() => {
        let script2 = document.createElement('script');
        script2.type = "text/javascript"
        script2.src = extensionUrl + relativeUrl;
        script2.onload = () => {
        };
        (document.head || document.documentElement).appendChild(script2);

    }, delay)
}

function needEditor() {
    return window.location.href.includes('/view.php?id=') ||
        window.location.href.includes('bugnote_edit_page.php') ||
        window.location.href.includes('bug_update_page.php') ||
        window.location.href.includes('bug_report_page.php');
}