import pictures from './pictures.json' assert { type: 'json' };

import { load, save } from './storage.js';

const main = document.querySelector('.main');
const content = document.querySelector('.content');
const lastSearch = document.querySelector('.last-search');

const loadFromStorage = load('lastSearch');
if (loadFromStorage) {
  drawLastResult(loadFromStorage);
}

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

// const minutes = document.querySelector('.minutes');
// const seconds = document.querySelector('.seconds');
// let sec = 50;
// let mins = 0;

// setInterval(() => {
//   sec += 1;

//   if (sec === 60) {
//     sec = 0;
//     mins += 1;
//   }

//   seconds.textContent = String(sec).padStart(2, '0');
//   minutes.textContent = String(mins).padStart(2, '0');
// }, 1000);

const timer = document.querySelector('.timer');

let timeCount = 0;

setInterval(() => {
  const minutes = convetTime(Math.floor(timeCount / 60));
  const seconds = convetTime(timeCount % 60);

  timer.textContent = `${minutes} : ${seconds}`;
  timeCount++;
}, 1000);

function convetTime(time) {
  if (time < 10) {
    return String(time).padStart(2, '0');
  }

  return time;
}
