import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
// const country = ukrayina;
// const fields = '${name.official},capital,population,flags.svg,languages';
export function fetchCountries(nameSearch) {
  const url = `${BASE_URL}${nameSearch}?fields=name,capital,population,flags,languages`;

  //   const url = `${BASE_URL}${nameSearch}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(dataCountry => dataCountry)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
