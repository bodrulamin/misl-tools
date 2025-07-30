document.querySelectorAll('td.bugnote-note-public').forEach(td => {
    td.innerHTML = td.innerHTML
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
});
