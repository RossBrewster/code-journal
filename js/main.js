const $image = document.querySelector('.url');
const $imgUrlInput = document.querySelector('#photo-url');
const $titleInput = document.querySelector('#entry-title');
const $notesInput = document.querySelector('#notes');
const $entryList = document.querySelector('.entry-list');
const $delete = document.querySelector('.delete');

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

  if (data.editing === null) {
    newEntry.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(newEntry);
    const $submission = renderEntry(newEntry);
    $entryList.prepend($submission);
  } else {
    newEntry.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newEntry.entryId) {
        data.entries[i] = newEntry;
      }
    }
    const $submission = renderEntry(newEntry);
    const $previousSubmissions = document.querySelectorAll('li');
    for (let i = 0; i < $previousSubmissions.length; i++) {
      if (
        $previousSubmissions[i].getAttribute('data-entry-id') ===
        newEntry.entryId
      ) {
        $previousSubmissions[i].replaceWith($submission);
      }
    }
  }

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entry.reset();
  viewSwap('entries');
  toggleNoEntries();
  $formTitle.textContent = 'New Entry';
  data.editing = null;
}

function renderEntry(entry) {
  const $liRow = document.createElement('li');
  $liRow.setAttribute('class', 'row');
  $liRow.setAttribute('data-entry-id', entry.entryId);

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

  const $splitRow = document.createElement('div');
  $splitRow.setAttribute('class', 'split-row');
  $noteText.appendChild($splitRow);

  const $noteTitle = document.createElement('h3');
  $noteTitle.textContent = entry.title;
  $splitRow.appendChild($noteTitle);

  const $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'fa fa-pencil');
  $pencilIcon.setAttribute('aria-hidden', 'true');
  $splitRow.appendChild($pencilIcon);

  const $noteContent = document.createElement('p');
  $noteContent.textContent = entry.notes;
  $noteText.appendChild($noteContent);

  return $liRow;
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

function handleDOMContentLoaded(e) {
  viewSwap(data.view);
  toggleNoEntries();
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries.length !== 0) {
      const newLi = renderEntry(data.entries[i]);
      $entryList.appendChild(newLi);
    }
  }
}

const $noEntries = document.querySelector('.no-entries');

function toggleNoEntries() {
  if (data.entries.length === 0) {
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
  toggleNoEntries();
}

const $entriesAnchor = document.querySelector('.show-entries');

$entriesAnchor.addEventListener('click', handle$EntriesAnchorClick);

function handle$EntriesAnchorClick(e) {
  viewSwap('entries');
  $entry.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}

const $newEntryAnchor = document.querySelector('.new');

$newEntryAnchor.addEventListener('click', handle$NewEntryAnchorClick);

function handle$NewEntryAnchorClick(e) {
  viewSwap('entry-form');
  $delete.className = 'delete hidden';
  $formTitle.textContent = 'New Entry';
  data.editing = null;
}

$entryList.addEventListener('click', handleIconClick);
const $formTitle = document.querySelector('.form-title');

function handleIconClick(e) {
  if (e.target.className === 'fa fa-pencil') {
    viewSwap('entry-form');
    const clickedEntryId = +e.target
      .closest('li')
      .getAttribute('data-entry-id');

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === clickedEntryId) {
        data.editing = data.entries[i];
      }
    }

    $titleInput.value = data.editing.title;
    $imgUrlInput.value = data.editing.image;
    handleUrlInput();
    $notesInput.value = data.editing.notes;
    $formTitle.textContent = 'Edit Entry';
    $delete.className = 'delete';
  }
}

const $overlayModal = document.querySelector('.overlay');
$delete.addEventListener('click', handleDeleteModalAppearance);

function handleDeleteModalAppearance(e) {
  $overlayModal.className = 'overlay on';
}

const $cancelButton = document.querySelector('.cancel');
$cancelButton.addEventListener('click', handleCancelClick);

function handleCancelClick(e) {
  $overlayModal.className = 'overlay off';
}

const $confirmButton = document.querySelector('.confirm');
$confirmButton.addEventListener('click', handleConfirmation);

function handleConfirmation(e) {
  const editingEntryId = data.editing.entryId;

  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === editingEntryId) {
      data.entries.splice(i, 1);
    }
  }

  const $previousSubmissions = document.querySelectorAll('li');
  for (let i = 0; i < $previousSubmissions.length; i++) {
    if (
      +$previousSubmissions[i].getAttribute('data-entry-id') === editingEntryId
    ) {
      $previousSubmissions[i].remove();
    }
  }

  $overlayModal.className = 'overlay off';
  $entry.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  viewSwap('entries');
  data.editing = null;
}
