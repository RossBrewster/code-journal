const $image = document.querySelector('.url');
const $imgUrlInput = document.querySelector('#photo-url');
const $titleInput = document.querySelector('#entry-title');
const $notesInput = document.querySelector('#notes');
const $entryList = document.querySelector('.entry-list');

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

  const submission = renderEntry(newEntry);
  $entryList.prepend(submission);
  viewSwap('entries');
  toggleNoEntries();
}

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

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded(e) {
  for (let i = 0; i < data.entries.length; i++) {
    viewSwap(data.view);
    if (data.entries !== []) {
      const newLi = renderEntry(data.entries[i]);
      $entryList.appendChild(newLi);
    }
    toggleNoEntries();
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

const $entriesAnchor = document.querySelector('.show-entries');

$entriesAnchor.addEventListener('click', handle$EntriesAnchorClick);

function handle$EntriesAnchorClick(e) {
  viewSwap('entries');
}

const $newEntryAnchor = document.querySelector('.new');

$newEntryAnchor.addEventListener('click', handle$NewEntryAnchorClick);

function handle$NewEntryAnchorClick(e) {
  viewSwap('entry-form');
}
