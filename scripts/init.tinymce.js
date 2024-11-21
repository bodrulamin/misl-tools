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
        'lists', 'link', 'charmap', 'preview', 'searchreplace', 'fullscreen', 'insertdatetime', 'wordcount'
    ],
    menubar: false,
    toolbar: 'code undo redo | bold italic underline | ' +
        'bullist numlist checklist pastetext searchreplace fullscreen',

    paste_as_text: true,
    entity_encoding: 'raw',
    
    formats: {
        underline: {inline: 'u'},
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

/* Flexbox to align buttons vertically */

const skickyDiv = document.createElement('div');
skickyDiv.style.display = 'flex';
skickyDiv.style.flexDirection = 'column';
skickyDiv.id = 'quickMenu';
skickyDiv.style.position = 'fixed';
skickyDiv.style.right = '10px';
skickyDiv.style.top = '50%';
skickyDiv.style.transform = 'translateY(-50%)';
skickyDiv.style.padding = '10px';
skickyDiv.style.backgroundColor = '#f1f1f1';  
skickyDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';  
skickyDiv.style.borderRadius = '10px';  
skickyDiv.style.zIndex = '1000';
skickyDiv.style.opacity = '0.5';  
skickyDiv.style.gap = '10px';  



const buttonStyle = `
  padding: 8px 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;  
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;  
`;


var openBugIndex = 0;
const firstNote = document.createElement('button');
firstNote.innerHTML = '↑';  
firstNote.style.cssText = buttonStyle;
let clickCount = 0;
firstNote.onclick = function (event) {
    clickCount++;
    setTimeout(function () {
        if (clickCount === 1) {
            openBugIndex = 0;
            let element = document.querySelectorAll('.bugnote')[0]
            if (element) {
                element.scrollIntoView({behavior: "smooth", block: "start"});
            }
        } else if (clickCount === 2) {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        clickCount = 0;
    }, 300);
};
skickyDiv.appendChild(firstNote);


const lastNote = document.createElement('button');
lastNote.innerHTML = '↓';  
lastNote.style.cssText = buttonStyle;
lastNote.onclick = function () {
    let element = document.querySelectorAll('.bugnote')[document.querySelectorAll('.bugnote').length - 2]
    if (element) {
        element.scrollIntoView({behavior: "smooth", block: "start"});
    }
};
skickyDiv.appendChild(lastNote);

document.body.appendChild(skickyDiv);


skickyDiv.onmouseover = function () {
    skickyDiv.style.opacity = '1';  
    firstNote.style.opacity = '1';  
    lastNote.style.opacity = '1';
};

skickyDiv.onmouseout = function () {
    skickyDiv.style.opacity = '0.5';  
    firstNote.style.opacity = '0.5';  
    lastNote.style.opacity = '0.5';
};

const bugnoteElements = document.querySelectorAll('.bugnote-public');

bugnoteElements.forEach(element => {
    const firstLink = element.querySelector('a');
    if (firstLink) {
        
        const popupButton = document.createElement('button');
        popupButton.textContent = 'Paste Note Id';
        popupButton.className = 'popup-button';
        popupButton.style.display = 'none'; 
        document.body.appendChild(popupButton);

        
        firstLink.addEventListener('mouseover', () => {
            const linkRect = firstLink.getBoundingClientRect();
            popupButton.style.position = 'absolute';
            popupButton.style.left = `${linkRect.left}px`;
            popupButton.style.top = `${linkRect.bottom + window.scrollY}px`;
            popupButton.style.display = 'block';
        });

        
        firstLink.addEventListener('mouseout', (event) => {
            
            setTimeout(() => {
                if (!popupButton.matches(':hover') && !firstLink.matches(':hover')) {
                    popupButton.style.display = 'none';
                }
            }, 100);
        });

        
        popupButton.addEventListener('mouseover', () => {
            popupButton.style.display = 'block';
        });

        
        popupButton.addEventListener('mouseout', (event) => {
            setTimeout(() => {
                if (!popupButton.matches(':hover') && !firstLink.matches(':hover')) {
                    popupButton.style.display = 'none';
                }
            }, 100);
        });

        
        popupButton.addEventListener('click', () => {
            let noteId = '';
            const regex = /#c(\d+)$/;
            const match = firstLink.href.match(regex);
            if (match && match[1]) {
                noteId = '~' + match[1];
            }

            noteTextArea.value = noteTextArea.value += ' ' + noteId + ' '
        });
    }
});

const bnotes = document.querySelectorAll('.bugnote-note-public');

var openBnotes = Array.from(bnotes).filter(element => element.innerHTML.trim() === 'open');

var bcDiv = document.createElement('button');
bcDiv.title = 'Open Bugs Count';
bcDiv.onclick = () => {
    if (openBnotes.length) {
        var scrollElement = openBnotes[openBugIndex].parentElement;

        for (let index = 0; index < 4; index++) {
            scrollElement = scrollElement.previousElementSibling;
        }


        
        const tdElements = scrollElement.querySelectorAll('td');

        
        function highlightTdElements() {
            const td = tdElements[tdElements.length - 1];
            td.style.transition = 'background-color 0.5s ease';
            td.style.backgroundColor = '#fcbdbd';
            setTimeout(() => {
                td.style.backgroundColor = '';
            }, 500);
            setTimeout(() => {
                td.style.backgroundColor = '#fcbdbd';
            }, 1000);

            setTimeout(() => {
                td.style.backgroundColor = '';
            }, 1500);
        }


        highlightTdElements();

        const elementHeight = scrollElement.offsetHeight; 
        const viewportHeight = window.innerHeight; 

        
        const blockOption = elementHeight > viewportHeight ? "start" : "center";

        
        scrollElement.scrollIntoView({
            behavior: "smooth",
            block: blockOption
        });
        if (openBugIndex + 1 < openBnotes.length) {
            openBugIndex++;
        } else {
            openBugIndex = 0;
        }
    }


};
bcDiv.innerHTML = openBnotes.length;

skickyDiv.appendChild(bcDiv);

const quickMenuStatus = localStorage.getItem('quickMenu');
console.log(quickMenuStatus);

if (quickMenuStatus === 'show' || quickMenuStatus === undefined || quickMenuStatus === null) {
    skickyDiv.style.display = 'flex'
} else {
    skickyDiv.style.display = 'none'

}
