/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', handleBeforeUnload);

function handleBeforeUnload(e) {
  const entryHistoryJSON = JSON.stringify(data);
  localStorage.setItem('entries', entryHistoryJSON);
}

const previousEntriesJSON = localStorage.getItem('entries');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
