const textarea = document.querySelector('textarea[name="bugnote_text"]');
textarea.id = 'mytextareax';


// Create a new div element for the wrapper
var wrapperDiv = document.createElement('div');
wrapperDiv.style.position = 'relative';
wrapperDiv.style.display = 'inline-block'; // Ensure it fits around the textarea

// Create a new button element
var button = document.createElement('button');
button.textContent = '[ ]';
button.type = 'button';
button.style.position = 'absolute';
button.style.cursor = 'pointer';
button.style.top = '5px'; // Adjust as needed
button.style.right = '5px'; // Adjust as needed

// Insert the wrapper div before the textarea
textarea.parentNode.insertBefore(wrapperDiv, textarea);

// Move the textarea inside the new div
wrapperDiv.appendChild(textarea);

// Add the button to the div
wrapperDiv.appendChild(button);

// Create the modal
var modal = document.createElement('div');
modal.id = 'myModal';
modal.style.display = 'none'; // Hidden by default
modal.style.position = 'fixed';
modal.style.zIndex = '1';
modal.style.left = '0';
modal.style.top = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.overflow = 'auto';
modal.style.backgroundColor = 'rgba(0,0,0,0.4)';

// Modal content
var modalContent = document.createElement('div');
modalContent.style.backgroundColor = '#fefefe';
modalContent.style.marginTop = '0px';
modalContent.style.marginRight = 'auto';
modalContent.style.marginLeft = 'auto';


modalContent.style.padding = '20px';
modalContent.style.border = '1px solid #888';
modalContent.style.width = '80%';
modalContent.style.maxWidth = '900px';

// Create a close button for the modal
var closeModal = document.createElement('span');
closeModal.textContent = '×';
closeModal.id = 'closeModal'; // Added an ID for debugging
closeModal.style.color = '#aaa';
closeModal.style.float = 'right';
closeModal.style.fontSize = '28px';
closeModal.style.fontWeight = 'bold';
closeModal.style.cursor = 'pointer';

// Create a new textarea element to add inside the modal
var modalTextarea = document.createElement('textarea');
modalTextarea.id = 'mytextarea'; // Set ID for the textarea
modalTextarea.rows = '10';
modalTextarea.cols = '80';
modalTextarea.style.width = '100%'; // Make textarea fit the modal content width

// Create a container for the buttons
var buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.justifyContent = 'flex-end'; // Align buttons to the right
buttonContainer.style.marginTop = '20px'; // Add space between textarea and buttons

// Create Submit and Cancel buttons
var submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButton.type = 'button';
submitButton.style.backgroundColor = '#4CAF50'; // Green
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
cancelButton.style.backgroundColor = '#f44336'; // Red
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

// Append the close button, textarea, and button container to the modal content
modalContent.appendChild(closeModal);
modalContent.innerHTML += '<h2>Editor</h2>'; // Add your content here
modalContent.appendChild(modalTextarea);
buttonContainer.appendChild(submitButton);
buttonContainer.appendChild(cancelButton);
modalContent.appendChild(buttonContainer);

// Append the modal content to the modal
modal.appendChild(modalContent);

// Append the modal to the body
document.body.appendChild(modal);

// Event listener for the button to show the modal
button.onclick = function () {
  modal.style.display = 'block';
  var editor = tinymce.get('mytextarea');

  var editorContent = editor.setContent(textarea.value);
}

// Event listener for the close button to hide the modal
document.getElementById('closeModal').onclick = function () {
  modal.style.display = 'none';
}

// Event listener to close the modal when clicking outside of it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Event listener for the submit button
submitButton.onclick = function () {
  var editor = tinymce.get('mytextarea');

  var result = editor.getContent();
  result = result.replace(/\n(?!\n)/g, '');
  result = result.replace('<p>', '').replace('</p>', '');
  textarea.value = result;
  modal.style.display = 'none';
}

// Event listener for the cancel button
cancelButton.onclick = function () {
  modal.style.display = 'none';
}

// Insert the new div after the target element
// textarea.insertAdjacentElement('afterend', newDiv);

tinymce.init({
  promotion: false,
  // newline_behavior: 'linebreak',
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
  // valid_elements:'p, li, ul, ol, br, pre, i, b, u, em, strong',
  formats: {
    underline: { inline: 'u' }
  },
  branding: false,
  statusbar: true,
  elementpath: false,
  setup: function (editor) {
    editor.on('keydown', function (e) {
      if (e.keyCode === 13) { // Check for Enter key without Shift
        e.preventDefault(); // Prevent default paragraph creation
        // editor.insertContent('<br>'); // Insert a line break with <br> tag
        tinyMCE.execCommand('mceInsertContent', false, "<br/> ");


        // Remove all single line breaks
        let result = editor.getContent().replace(/\n(?!\n)/g, '');
        // Remove the first line break from two or more consecutive line breaks
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
    // Create the new div element
    const newDiv = document.createElement('div');
    newDiv.style.display = 'flex';
    newDiv.style.flex = '1 1 auto';
    newDiv.style.textOverflow = 'ellipsis';
    newDiv.style.whiteSpace = 'nowrap';

    const anchorTag = document.createElement('a');
    anchorTag.textContent = 'craftedBy: BodrulAmin';
    anchorTag.href = 'https://bodrulamin.web.app';
    anchorTag.target = '_blank';

    newDiv.appendChild(anchorTag);

    statusBarContainer.insertBefore(newDiv, statusBarContainer.firstChild);
  }
}, 1000);




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
skickyDiv.style.backgroundColor = '#f1f1f1';  // Light background for contrast
skickyDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';  // Adds a subtle shadow
skickyDiv.style.borderRadius = '10px';  // Rounded corners
skickyDiv.style.zIndex = '1000';
skickyDiv.style.opacity = '0.5';  // 50% opacity for the div
skickyDiv.style.gap = '10px';  // Adds spacing between the buttons


// Button styles
const buttonStyle = `
  padding: 8px 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;  // Bigger font for icon-like appearance
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;  // Add smooth transition for opacity
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;  // 50% opacity for the buttons
`;

// First button (arrow up)
var openBugIndex = 0;
const firstNote = document.createElement('button');
firstNote.innerHTML = '↑';  // Unicode arrow up symbol
firstNote.style.cssText = buttonStyle;
firstNote.onclick = function () {
  openBugIndex = 0;
  let element = document.querySelectorAll('.bugnote')[0]
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
skickyDiv.appendChild(firstNote);

// Last button (arrow down)
const lastNote = document.createElement('button');
lastNote.innerHTML = '↓';  // Unicode arrow down symbol
lastNote.style.cssText = buttonStyle;
lastNote.onclick = function () {
  let element = document.querySelectorAll('.bugnote')[document.querySelectorAll('.bugnote').length - 2]
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
skickyDiv.appendChild(lastNote);

document.body.appendChild(skickyDiv);

// Apply hover effect to the entire div and its children
skickyDiv.onmouseover = function () {
  skickyDiv.style.opacity = '1';  // Make div fully opaque on hover
  firstNote.style.opacity = '1';  // Make buttons fully opaque on hover
  lastNote.style.opacity = '1';
};

skickyDiv.onmouseout = function () {
  skickyDiv.style.opacity = '0.5';  // Revert div opacity to 50% when mouse leaves
  firstNote.style.opacity = '0.5';  // Revert buttons opacity to 50%
  lastNote.style.opacity = '0.5';
};

const bugnoteElements = document.querySelectorAll('.bugnote-public');

bugnoteElements.forEach(element => {
  const firstLink = element.querySelector('a');
  if (firstLink) {
    // Create the popup button
    const popupButton = document.createElement('button');
    popupButton.textContent = 'Paste Note Id';
    popupButton.className = 'popup-button';
    popupButton.style.display = 'none'; // Initially hidden
    document.body.appendChild(popupButton);

    // Show the button on hover over the link
    firstLink.addEventListener('mouseover', () => {
      const linkRect = firstLink.getBoundingClientRect();
      popupButton.style.position = 'absolute';
      popupButton.style.left = `${linkRect.left}px`;
      popupButton.style.top = `${linkRect.bottom + window.scrollY}px`;
      popupButton.style.display = 'block';
    });

    // Hide the button when the mouse leaves the link
    firstLink.addEventListener('mouseout', (event) => {
      // Delay hiding to allow time for mouse to move to the button
      setTimeout(() => {
        if (!popupButton.matches(':hover') && !firstLink.matches(':hover')) {
          popupButton.style.display = 'none';
        }
      }, 100);
    });

    // Show the button on hover over the button itself
    popupButton.addEventListener('mouseover', () => {
      popupButton.style.display = 'block';
    });

    // Hide the button when the mouse leaves the button
    popupButton.addEventListener('mouseout', (event) => {
      setTimeout(() => {
        if (!popupButton.matches(':hover') && !firstLink.matches(':hover')) {
          popupButton.style.display = 'none';
        }
      }, 100);
    });

    // Handle button click
    popupButton.addEventListener('click', () => {
      let noteId = '';
      const regex = /#c(\d+)$/;
      const match = firstLink.href.match(regex);
      if (match && match[1]) {
        noteId = '~' + match[1];
      }

      textarea.value = textarea.value += ' ' + noteId + ' '
    });
  }
});

const bnotes = document.querySelectorAll('.bugnote-note-public');

var openBnotes = Array.from(bnotes).filter(element => element.innerHTML.trim() === 'open');

var bcDiv = document.createElement('button');
bcDiv.onclick = () => {
if(openBnotes.length){
  var scrollElement = openBnotes[openBugIndex].parentElement;
  for (let index = 0; index < 4; index++) {
    scrollElement = scrollElement.previousElementSibling;

  }

  scrollElement.scrollIntoView({ behavior: "smooth", block: "start" });
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
