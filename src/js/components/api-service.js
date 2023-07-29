const BASE_URL = 'https://restcountries.com/v3.1/name/';
const options = '?fields=name,capital,population,flags,languages';

export function fetchCountries(nameSearch) {
  const url = `${BASE_URL}${nameSearch}${options}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .then(dataCountry => dataCountry)
    .catch(error => console.log(error.message));
}
