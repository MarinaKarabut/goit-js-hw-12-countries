import countryCardTpl from '../templates/cardOneCountry.hbs'
import countriesListTpl from '../templates/cardListCountries.hbs'
import API from './api-service.js'
import { error } from'@pnotify/core';
import"@pnotify/core/dist/BrightTheme.css"
import"@pnotify/core/dist/PNotify.css";
var debounce = require('lodash.debounce');



const cardContainer = document.querySelector('.js-card-container')
const listCountries = document.querySelector('.list-countries')
const formSearch = document.querySelector('.js-search-form')

formSearch.addEventListener('input', debounce(onSearchCountry, 500))


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
        } else if (searchQuery.length > 10) {
            onError("Too many matches found. Pleas enter a more specific query")   
                  
        }
    }))
    .catch(error => {  
            onError("No country has been found. Please enter a more specific query!")  
    }
        
        
        
        // cardContainer.insertAdjacentHTML('beforeend',`<p class="card-text-error">No country has been found. Please enter a more specific query!<p>`)
    )
    
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



function onError(message) {
    error( {delay: 1000, text: message}
    )
}