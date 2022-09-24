var citySearchName = document.querySelector('.searchcityname');
var citySearchInput = document.querySelector('.search-button');
var API_KEY = '958bf1982262f64b477214a11d1708fc';
var citySearched = document.querySelector(".city");
var currentTemperature = document.getElementById("temperature");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind");
var cityHistory = [];

citySearchInput.addEventListener("submit", function() {
    weatherAPI(citySearchName.value);
})

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
                    var weatherIcon = data['current']['weather']['0']['icon'];
                    var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

                    var date = new Date(data['current']['dt'] * 1000).toLocaleDateString();
                    citySearched.innerHTML += " " + date + "<img src=" + iconURL + ">";

                    currentTemp.textContent = data['current']['temp'] + "˚F";
                    currentHumidity.textContent = data['current']['humidity'] + "%";
                    currentWind.textContent = data['current']['wind'] + "mph";
                    
                    // data to get the next 5 days weather
                    gettingWeather(data);
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

function gettingWeather(data) {
    const MAX_FORECAST = 5;
    // next 5 days weather
    for (i = 0; i < MAX_FORECAST; i++) {
        var currDate = document.getElementById("weatherDate" + i);
        var currIcon = document.getElementById("weatherImg" + i);
        var currTemperature = document.getElementById("weatherTemp" + i);
        var currHumidity = document.getElementById("weatherHumidity" + i);

        var date = new Date(data["daily"][i]['dt'] * 1000).toLocaleDateString();
        currDate.textContent = date;
        // getting weather icon from api
        var weatherIcon = data['daily'][i]['weather']['0']['icon'];
        var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        currIcon.innerHTML = "<img src=" + iconURL + ">";

        currTemperature.textContent = data['daily'][i]['temp']['day'] + "°F";
        currHumidity.textContent = data['daily'][i]['humidity'] + "%";
    }
}