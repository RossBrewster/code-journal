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
  $entry.reset();
}

/* <li class="row">
  <div class="column-half">
    <img
      src="https://media1.giphy.com/media/LfwMyRpf9X6q4/200.webp"
      alt="dummy-gif" />
  </div>
  <div class="column-half">
    <h3>A gif</h3>
    <p>Snow White</p>
  </div>
</li> */

function renderEntry(entry) {
  const $liRow = document.createElement('li');
  $liRow.setAttribute('class', 'row');

  const $imgDiv = document.createElement('div');
  $imgDiv.setAttribute('class', 'column-half');
  $liRow.appendChild($imgDiv);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.image);
  $img.setAttribute('alt', entry.title);
  $imgDiv.appendChild($img);

  const $noteText = document.createElement('div');
  $noteText.setAttribute('class', 'column-half');
  $liRow.appendChild($noteText);

  const $noteTitle = document.createElement('h3');
  $noteTitle.textContent = entry.title;
  $noteText.appendChild($noteTitle);

  const $noteContent = document.createElement('p');
  $noteContent.textContent = entry.notes;
  $noteText.appendChild($noteContent);

  return $liRow;
}

const $entryList = document.querySelector('.entry-list');

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded(e) {
  for (let i = 0; i < data.entries.length; i++) {
    const newLi = renderEntry(data.entries[i]);
    $entryList.appendChild(newLi);
  }
}

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries === []) {
    $noEntries.className = 'no-entries';
  } else {
    $noEntries.className = 'no-entries hidden';
  }
}

toggleNoEntries();

const $entryForm = document.querySelector("div[data-view='entry-form'");
const $entries = document.querySelector("div[data-view='entries'");

function viewSwap(view) {
  data.view = view;
  if (view === 'entry-form') {
    $entryForm.setAttribute('class', '');
    $entries.setAttribute('class', 'hidden');
  } else {
    $entries.setAttribute('class', '');
    $entryForm.setAttribute('class', 'hidden');
  }
}
viewSwap();
