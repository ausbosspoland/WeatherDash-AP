var citySearchForm = document.querySelector('.citysearchform');
var citySearchInput = document.querySelector('#searchcityname');
var API_KEY = '958bf1982262f64b477214a11d1708fc';

citySearchForm.addEventListener("submit", )

function cityUSerInput(event) {
    event.preventDefault();
    var cityName = citySearchInput.value;
    getLatLon(cityName);
}

function getLatLon(cityName) {

    console.log(cityName);

    var latLonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`

    console.log("here", latLonUrl);

    fetch(latLonUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            console.log(lat, lon)
        })
    
}