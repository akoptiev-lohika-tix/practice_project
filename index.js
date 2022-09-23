import pictures from './pictures.json' assert { type: 'json' };

const main = document.querySelector('.main');

const inputPlaceholder = 'Search...';

const inputMarkup = `<input class="input is-primary" type="text" placeholder="${inputPlaceholder}">`;

main.insertAdjacentHTML('afterbegin', inputMarkup);

const input = document.querySelector('.input');

input.addEventListener('input', handleSearch);

function handleSearch(event) {
  const searcResult = pictures.filter((picture) =>
    picture.title.includes(event.target.value)
  );
  console.log(searcResult);
}
