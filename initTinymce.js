const textarea = document.querySelector('textarea[name="bugnote_text"]');
textarea.id = 'mytextarea';
tinymce.init({
  promotion: false,
  // newline_behavior: 'linebreak',
  remove_linebreaks: false,
  apply_source_formatting: false,
  license_key: 'gpl',
  selector: '#mytextarea',
  plugins: [
    'code', 'advlist', 'autolink',
    'lists', 'link', 'charmap', 'preview', 'searchreplace', 'fullscreen', 'insertdatetime', 'wordcount'
  ],
  menubar: false,
  toolbar: 'code undo redo blocks | link bold italic underline | ' +
    'bullist numlist checklist pastetext searchreplace fullscreen',
  paste_as_text: true,
  entity_encoding: 'raw',
  // valid_elements:'li, ul, ol, br, pre, i, b, u, em,',
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
        editor.setContent(content)

      }
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
  const firstNote = document.createElement('button');
  firstNote.innerHTML = '↑';  // Unicode arrow up symbol
  firstNote.style.cssText = buttonStyle;
  firstNote.onclick = function () {
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

        let iframe = document.getElementById('mytextarea_ifr');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        let editorBody = iframeDocument.getElementById('tinymce');
        editorBody.innerHTML += noteId
      });
    }
  });

  const quickMenuStatus = localStorage.getItem('quickMenu');
  if (quickMenuStatus === 'show') {
  skickyDiv.style.display = 'flex'
  
  } else {
    skickyDiv.style.display = 'none'

  }
