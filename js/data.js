/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeUnload', handleBeforeUnload);

function handleBeforeUnload(e) {
  const entryHistoryJSON = JSON.stringify(data);
  localStorage.setItem('entries', entryHistoryJSON);
}
