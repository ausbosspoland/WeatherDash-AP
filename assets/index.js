var citySearchForm = document.querySelector('.citysearchform');
var citySearchInput = document.querySelector('#searchcityname');
var city = document.querySelector(".")
var API_KEY = '958bf1982262f64b477214a11d1708fc';
var citySearched = document.querySelector(".city");
var cityHistory = [];

function cityUserInput(event) {
    event.preventDefault();
    var cityName = citySearchInput.value;
    getLatLon(cityName);
}
// function for latitude longitude and open weather api
function weatherAPI(cityName) {

    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API_KEY)
        .then(response => response.json())
        .then(data => {
            citySearched.textContent = data[''];
            var lon = data['coord']['lon'];
            var lat = data['coord']['lat'];

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=imperial")
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    storeSearch(cityName);
                })
        })
}

function storeSearch(cityName) {
    if (!cityHistory.includes(cityName)) {
        cityHistory.push(cityName);
        createEle(cityName);
    }
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    console.log(cityHistory);
}