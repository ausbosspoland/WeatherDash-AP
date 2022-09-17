var citySearchForm = document.querySelector('.citysearchform');
var citySearchInput = document.querySelector('#searchcityname');

citySearchForm.addEventListener("submit", )

function cityUSerInput(event) {
    event.preventDefault();
    var cityName = citySearchInput.value;
    getLatLon(cityName);
}

function getLatLon(cityName) {

    console.log(cityName);
    
}