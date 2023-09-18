const $image = document.querySelector('.url');
const $imgUrlInput = document.querySelector('#photo-url');

$imgUrlInput.addEventListener('input', handleUrlInput);

function handleUrlInput(e) {
  $image.setAttribute('src', $imgUrlInput.value);
}
