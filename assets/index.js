var citySearchName = document.querySelector('.searchcityname');
var citySearchInput = document.querySelector('.searchbutton');
//var API_KEY = "1e8cc817784851ff1302d90e048dceb9";
var citySearched = document.querySelector(".city");
var currentTemperature = document.getElementById("temperature");
var currentHumidity = document.getElementById("humidity");
var currentWind = document.getElementById("wind");
var cityHistory = [];

localStorage.clear();

citySearchInput.addEventListener("click", function() {
    weatherAPI(citySearchName.value);
})

// function for latitude longitude and open weather api
function weatherAPI(cityName) {

    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=1e8cc817784851ff1302d90e048dceb9")
        .then(response => response.json())
        .then(data => {
            citySearched.textContent = data['city'];
            var lat = data['coord']['lat'];
            var lon = data['coord']['lon'];

            fetch("https://api.openweathermap.org/geo/1.0/direct?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1e8cc817784851ff1302d90e048dceb9")
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    storeSearch(city);
                    var weatherIcon = data['current']['weather']['0']['icon'];
                    var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

                    var date = new Date(data['current']['dt'] * 1000).toLocaleDateString();
                    citySearched.innerHTML = " " + date + "<img src=" + iconURL + ">";

                    currentTemperature.textContent = data['current']['temperature'] + "˚F";
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
    const allTheDays = 5;
    // next 5 days weather
    for (i = 0; i < allTheDays; i++) {
        var currDate = document.getElementById("weatherDate" + i);
        var currIcon = document.getElementById("weatherImg" + i);
        var currTemperature = document.getElementById("weatherTemp" + i);
        var currHumidity = document.getElementById("weatherHumidity" + i);

        var date = new Date(data["daily"][i]['dt'] * 1000).toLocaleDateString();
        currDate.textContent = date;
        // getting icon image from api
        var iconImage = data['daily'][i]['weather']['0']['icon'];
        var iconURL = "https://openweathermap.org/img/wn/" + iconImage + "@2x.png";
        currIcon.innerHTML = "<img src=" + iconURL + ">";

        currTemperature.textContent = data['daily'][i]['temperature']['day'] + "°F";
        currHumidity.textContent = data['daily'][i]['humidity'] + "%";
    }
}