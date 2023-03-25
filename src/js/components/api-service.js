import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const options = '?fields=name,capital,population,flags,languages';
// const country = ukrayina;
// const fields = '${name.official},capital,population,flags.svg,languages';
export function fetchCountries(nameSearch) {
  const url = `${BASE_URL}${nameSearch}${options}`;

  //   const url = `${BASE_URL}${nameSearch}`;

  return fetch(url)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(dataCountry => dataCountry)
    .catch(
      error =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      // console.dir(error)
    );
}
