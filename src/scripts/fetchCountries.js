import countryCardTpl from '../templates/cardOneCountry.hbs'
import countriesListTpl from '../templates/cardListCountries.hbs'
import API from './api-service.js'


const cardContainer = document.querySelector('.js-card-container')
const listCountries = document.querySelector('.list-countries')
const formSearch = document.querySelector('.js-search-form')

formSearch.addEventListener('input', onSearchCountry)


function onSearchCountry(e) {
    e.preventDefault()
    clearCardContainer()
    const searchQuery = e.target.value
    API.fetchCountry(searchQuery)
    .then((searchQuery => {
        if (searchQuery.length === 1) {
            renderCountryCard(searchQuery);
        } else if (searchQuery.length <= 10) {
            renderCountriesList(searchQuery);
        }
    }))
    .catch(error => console.log(error))
    // .finally(formSearch.reset())
}



function renderCountryCard(country) {
    const markup = countryCardTpl(country)
    cardContainer.insertAdjacentHTML('beforeend', markup)
    console.log(country);
}

function renderCountriesList(country) {
    const markup = countriesListTpl(country)
    listCountries.insertAdjacentHTML('beforeend', markup)
}


function clearCardContainer() {
    cardContainer.innerHTML = ''
    listCountries.innerHTML = ''
}

