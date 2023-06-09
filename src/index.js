import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/components/api-service';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;
let nameCountrySearch = '';

const refs = {
  input: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  dataCountry: document.querySelector('.country-info'),
};
// console.log(refs.input);
// console.log(refs.listCountries);
// console.log(refs.dataCountry);

refs.input.addEventListener('keydown', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  clearCountryData();
  nameCountrySearch = evt.target.value.trim();
  if (!nameCountrySearch) {
    return;
  }
  console.log(nameCountrySearch);
  fetchCountries(nameCountrySearch)
    .then(dataCountry => checkData(dataCountry))
    .catch(error => {
      console.log(error.message);
    });
}

function clearCountryData() {
  refs.listCountries.innerHTML = '';
  refs.dataCountry.innerHTML = '';
}

function checkData(dataCountry) {
  if (dataCountry.length === 0) {
    return Notiflix.Notify.failure('Oops, something went wrong');
  } else if (dataCountry.length > 10) {
    // clearCountryData();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (dataCountry.length >= 2 && dataCountry.length <= 10) {
    // console.log('в массиве от 2 до 10 стран');
    makeListMarkup(dataCountry);
  } else {
    makeMarkupForOneCountry(dataCountry);
  }
}
function makeListMarkup(dataCountry) {
  const listMarkUp = dataCountry
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class='item'>
      <img src="${svg}" alt="Flag of ${official}" width="25"> <span class='text'>${official}</span>
    </li>`;
    })
    .join('');
  appendCountriesListMarkup(listMarkUp);
  // console.log(listMarkUp);
}

function makeMarkupForOneCountry(dataCountry) {
  const markup = dataCountry
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => {
        const language = Object.values(languages).join(', ');
        // console.log(language);
        return `<div class='title_box'><img src="${svg}"alt="Flag of ${official}"width="30" /><h1 class="title_name">${official}</h1></div>
<p><span class="key">Capital:</span> ${capital}</p>
<p><span class="key">Population:</span> ${population}</p>
<p><span class="key">Languages:</span> ${language}</p>`;
      }
    )
    .join('');
  appendCountryMarkup(markup);
}
function appendCountriesListMarkup(listMarkUp) {
  // clearCountryData();
  refs.listCountries.innerHTML = listMarkUp;
}
function appendCountryMarkup(markup) {
  // clearCountryData();
  refs.dataCountry.innerHTML = markup;
}
