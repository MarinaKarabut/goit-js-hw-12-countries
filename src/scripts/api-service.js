const BASE_URL = 'https://restcountries.eu/rest/v2'


function fetchCountry(countryName) {
    return fetch(`${BASE_URL}/name/${countryName}`)
    .then((response) => {
        if(!response.ok){
            throw new Error("No country has been found. Please enter a more specific query!")
        }
        return response.json()
})
}
 
export default {fetchCountry}