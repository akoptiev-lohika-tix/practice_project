import pictures from './pictures.json' assert { type: 'json' };
import { loadTodos } from './api.js';
import { load, save } from './storage.js';

const main = document.querySelector('.main');
const content = document.querySelector('.content');
const lastSearch = document.querySelector('.last-search');
const pagination = document.querySelector('.pagination-list');
const paginationPagesCount = 20;
const paginationLimit = 10;
let activepage = null;

creatPaginationMurkup(paginationPagesCount);

activepage = pagination.querySelector('.pagination-link');

loadTodos(1, paginationLimit)
.then((data) => {

  activepage.classList.add('is-current');

  content.insertAdjacentHTML('afterbegin', getTodosListMarkup(data));
})
.catch((e) => {
  console.log(e.message);
});

pagination.addEventListener('click', handlePagination);

function handlePagination(event) {
  if (!event.target.classList.contains('pagination-link')) {
    return;
  }

  if (activepage) {
    activepage.classList.remove('is-current');
  }
  const page = Number(event.target.dataset.value);

  loadTodos(page, paginationLimit)
    .then((data) => {
      content.innerHTML = '';
      event.target.classList.add('is-current');
      activepage = event.target;
      content.insertAdjacentHTML('afterbegin', getTodosListMarkup(data));
    })
    .catch((e) => {
      console.log(e.message);
    });
}

function creatPaginationMurkup(count) {
  const markup = [];
  for (let i = 1; i <= count; i++) {
    markup.push(`<li>
      <a class="pagination-link" data-value="${i}" aria-label="Goto page ${i}">${i}</a>
    </li>
`);
  }

  pagination.insertAdjacentHTML('beforeend', markup.join(''));
}

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

function getTodosListMarkup(todos) {
  return todos.map(getTodoMarkup).join('');
}

function getTodoMarkup({ userId, id, title, completed }) {
  const isCompleted = completed ? 'is-success' : 'is-danger';
  return `
  <div class="notification ${isCompleted}">
  ${title} ID:${id}
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
