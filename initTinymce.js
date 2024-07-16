const textarea = document.querySelector('textarea[name="bugnote_text"]');
textarea.id = 'mytextarea';
tinymce.init({
  promotion: false,
  license_key: 'gpl',
  selector: '#mytextarea',
  plugins: [
    'code', 'advlist', 'autolink',
    'lists', 'link', 'charmap', 'preview', 'searchreplace', 'fullscreen', 'insertdatetime', 'wordcount'
  ],
  menubar: true,
  toolbar: 'code undo redo blocks | link bold italic underline | ' +
    'bullist numlist checklist pastetext searchreplace fullscreen',
  paste_as_text: true,
  branding: false,
  statusbar: true,
  elementpath: false,
  setup: function(editor) {
    editor.on('keydown', function(e) {
      if (e.keyCode === 13) { // Check for Enter key without Shift
        e.preventDefault(); // Prevent default paragraph creation
        // editor.insertContent('<br>'); // Insert a line break with <br> tag
        tinyMCE.execCommand('mceInsertContent',false, "<br/> ");
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
    anchorTag.href = 'https://bodrulamin.web.app'; // Set your href attribute here
    anchorTag.target = '_blank'; // Set target to '_blank' for opening in a new tab

    newDiv.appendChild(anchorTag); // Append the <a> tag to the <div>
    
    // Assuming statusBarContainer is already defined
    statusBarContainer.insertBefore(newDiv, statusBarContainer.firstChild);
  }
}, 1000);

