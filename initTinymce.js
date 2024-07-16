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
  toolbar: 'code undo redo | link bold italic underline | ' +
           'bullist numlist checklist pastetext searchreplace fullscreen',
  paste_as_text: true,
  branding: false,
  statusbar: true,
  statusbar_false_text: 'Your custom text here', // Text shown when no content is selected
  statusbar_true_text: '{chars} chars | {words} words | {blocks} blocks', 

});