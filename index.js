import pictures from './pictures.json' assert { type: 'json' };

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};


const main = document.querySelector('.main');
const content = document.querySelector('.content');
const lastSearch = document.querySelector('.last-search');

drawLastResult(load('lastSearch'));

const inputPlaceholder = 'Search...';

const inputMarkup = `<input class="input is-primary" type="text" placeholder="${inputPlaceholder}">`;

main.insertAdjacentHTML('afterbegin', inputMarkup);

const input = document.querySelector('.input');

input.addEventListener('input', customDebounce(handleSearch, 500));

function customDebounce(callback, delayTime) {
  return _.debounce(callback, delayTime);
}

function handleSearch(event) {
  removeContent(content);

  if (!event.target.value) {
    return;
  }

  const searcResult = pictures.filter((picture) =>
    picture.title.includes(event.target.value)
  );

  save('lastSearch', searcResult.length);

  drawLastResult(searcResult.length);

  if (searcResult.length !== 0) {
    content.insertAdjacentHTML('afterbegin', getImageListMarkup(searcResult));
  }
}

function getImageListMarkup(pictures) {
  return pictures.map(getImageMarkup).join('');
}

function getImageMarkup({ thumbnailUrl, title }) {
  return `
  <div>
   <img class="image" src="${thumbnailUrl}" alt="${title}">
  </div>`;
}

function removeContent(el) {
  while (el.childNodes.length !== 0) {
    el.firstChild.remove();
  }
}

function drawLastResult(value) {
  lastSearch.textContent = `Result of last search: ${value} of ${pictures.length}`;
}
