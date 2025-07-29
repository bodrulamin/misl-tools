var noteTextArea = document.querySelector('textarea[name="bugnote_text"]');

var currentTextArea;


var modal = document.createElement('div');
modal.id = 'myModal';
modal.style.display = 'none'; 
modal.style.position = 'fixed';
modal.style.zIndex = '1';
modal.style.left = '0';
modal.style.top = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.overflow = 'auto';
modal.style.backgroundColor = 'rgba(0,0,0,0.4)';


var modalContent = document.createElement('div');
modalContent.style.backgroundColor = '#fefefe';
modalContent.style.marginTop = '0px';
modalContent.style.marginRight = 'auto';
modalContent.style.marginLeft = 'auto';


modalContent.style.padding = '20px';
modalContent.style.border = '1px solid #888';
modalContent.style.width = '80%';
modalContent.style.maxWidth = '900px';


var closeModal = document.createElement('span');
closeModal.textContent = '×';
closeModal.id = 'closeModal'; 
closeModal.style.color = '#aaa';
closeModal.style.float = 'right';
closeModal.style.fontSize = '28px';
closeModal.style.fontWeight = 'bold';
closeModal.style.cursor = 'pointer';


var modalTextarea = document.createElement('textarea');
modalTextarea.id = 'mytextarea'; 
modalTextarea.rows = '10';
modalTextarea.cols = '80';
modalTextarea.style.width = '100%'; 


var buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.justifyContent = 'flex-end'; 
buttonContainer.style.marginTop = '20px'; 


var submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.type = 'button';
submitButton.style.backgroundColor = '#4CAF50'; 
submitButton.style.color = 'white';
submitButton.style.border = 'none';
submitButton.style.padding = '10px 20px';
submitButton.style.textAlign = 'center';
submitButton.style.textDecoration = 'none';
submitButton.style.display = 'inline-block';
submitButton.style.fontSize = '16px';
submitButton.style.cursor = 'pointer';
submitButton.style.borderRadius = '4px';
submitButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';

var cancelButton = document.createElement('button');
cancelButton.textContent = 'Cancel';
cancelButton.type = 'button';
cancelButton.style.backgroundColor = '#f44336'; 
cancelButton.style.color = 'white';
cancelButton.style.marginLeft = '5px';

cancelButton.style.border = 'none';
cancelButton.style.padding = '10px 20px';
cancelButton.style.textAlign = 'center';
cancelButton.style.textDecoration = 'none';
cancelButton.style.display = 'inline-block';
cancelButton.style.fontSize = '16px';
cancelButton.style.cursor = 'pointer';
cancelButton.style.borderRadius = '4px';
cancelButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';


modalContent.appendChild(closeModal);
modalContent.innerHTML += '<h2>Editor</h2>'; 
modalContent.appendChild(modalTextarea);
buttonContainer.appendChild(submitButton);
buttonContainer.appendChild(cancelButton);
modalContent.appendChild(buttonContainer);


modal.appendChild(modalContent);


document.body.appendChild(modal);



document.getElementById('closeModal').onclick = function () {
    modal.style.display = 'none';
}


window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


submitButton.onclick = function () {
    var editor = tinymce.get('mytextarea');
    var result = editor.getContent();
    result = result.replace(/\n(?!\n)/g, '');
    result = result.replace('<p>', '').replace('</p>', '');
    currentTextArea.value = result;
    modal.style.display = 'none';
}


cancelButton.onclick = function () {
    modal.style.display = 'none';
}




tinymce.init({
    promotion: false,
    
    remove_linebreaks: true,
    apply_source_formatting: false,
    license_key: 'gpl',
    selector: '#mytextarea',
    plugins: [
        'code', 'autolink',
        'lists', 'link', 'charmap', 'preview', 'searchreplace', 'fullscreen', 'insertdatetime', 'wordcount', 'strikethrough'
    ],
    menubar: false,
    toolbar: 'code undo redo | bold italic underline strikethrough | ' +
        'bullist numlist checklist pastetext searchreplace fullscreen',

    paste_as_text: true,
    entity_encoding: 'raw',
    
    formats: {
        underline: {inline: 'u'},
        strikethrough: {inline: 'strike'},
        bold: {inline: 'strong'},
        italic: {inline: 'em'}
    },
    branding: false,
    statusbar: true,
    elementpath: false,
    setup: function (editor) {
        editor.on('keydown', function (e) {
            if (e.keyCode === 13) { 
                e.preventDefault(); 
                
                tinyMCE.execCommand('mceInsertContent', false, "<br/> ");


                
                let result = editor.getContent().replace(/\n(?!\n)/g, '');
                
                result = result.replace(/\n{2,}/g, match => match.slice(1));
                console.log(result)
                editor.setContent(result)

            }
        });
    },

    setup: function (editor) {
        editor.on('blur', function (e) {
            let result = editor.getContent().replace(/\n(?!\n)/g, '');
            result = result.replace(/\n{2,}/g, match => match.slice(1));
            console.log(editor);
            editor.setContent(result)

        });
    }

});


setTimeout(() => {
    const statusBarContainer = document.querySelector('.tox-statusbar__text-container');

    if (statusBarContainer) {
        
        const newDiv = document.createElement('div');
        newDiv.style.display = 'flex';
        newDiv.style.flex = '1 1 auto';
        newDiv.style.textOverflow = 'ellipsis';
        newDiv.style.whiteSpace = 'nowrap';

        const anchorTag = document.createElement('a');
        anchorTag.textContent = 'craftedBy: BodrulAmin';
        anchorTag.href = 'https://bodrulamin.github.io';
        anchorTag.target = '_blank';

        newDiv.appendChild(anchorTag);

        statusBarContainer.insertBefore(newDiv, statusBarContainer.firstChild);
    }
}, 1000);

const textareas = document.querySelectorAll('textarea');
textareas.forEach((textarea) => {
    if (textarea.id !== 'mytextarea') {
        var wrapperDiv = document.createElement('div');
        wrapperDiv.style.position = 'relative';
        wrapperDiv.style.display = 'inline-block'; 

        var button = document.createElement('button');
        button.textContent = '[ ]';
        button.type = 'button';
        button.style.position = 'absolute';
        button.style.cursor = 'pointer';
        button.style.top = '5px'; 
        button.style.right = '5px'; 

        
        textarea.parentNode.insertBefore(wrapperDiv, textarea);

        
        wrapperDiv.appendChild(textarea);

        
        wrapperDiv.appendChild(button);
        
        button.onclick = function () {
            currentTextArea = textarea;
            modal.style.display = 'block';
            var editor = tinymce.get('mytextarea');
            editor.setContent(textarea.value);
        }
    }


});
