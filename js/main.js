const $image = document.querySelector('.url');
const $imgUrlInput = document.querySelector('#photo-url');
const $titleInput = document.querySelector('#entry-title');
const $notesInput = document.querySelector('#notes');

$imgUrlInput.addEventListener('input', handleUrlInput);

function handleUrlInput(e) {
  $image.setAttribute('src', $imgUrlInput.value);
}

const $entry = document.querySelector('.journal-entry');

$entry.addEventListener('submit', handleSubmission);

function handleSubmission(e) {
  e.preventDefault();
  const newEntry = {
    title: $titleInput.value,
    image: $imgUrlInput.value,
    notes: $notesInput.value,
  };
  newEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $imgUrlInput.value = '';
  $titleInput.value = '';
  $notesInput.value = '';
}
