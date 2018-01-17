/*eslint-env browser*/
/*eslint "no-console": "off"*/
/*global $*/

var jsonData = {};

$(function () {
    $("#date").html("Today is " + Date());
//    $("#searchButton").on("click", showWeather);
    $("#city").on("keypress", (function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            showWeather();
        }
    }));
});

function showWeather() {

    if ($("#city").val().length < 2) {
        alert("Please enter a valid name of a city");
    } else if ($("#city").val().length >= 2) {
        var inputValue = document.getElementById("city").value;
        var newUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + inputValue + "&type=like&units=metric&APPID=da980c9ec3ce3a023d6acb1607316d3f";

        $.getJSON(newUrl)
            .done(function (data) {
                jsonData = data;
                createWeatherData(jsonData);
                
            })
            .fail(function () {
                alert("City not found. Please check whether you entered the city name correctly");

            });
    }
}

function createWeatherData(obj) {

    var weather_data = document.getElementById("weatherData");
    $("#weatherData").empty();

    var newCityElement = $("<p></p>").html(obj.name).addClass("city");
    $(weather_data).append(newCityElement);

    var newTempElement = $("<p></p>").html(Math.round(obj.main.temp) + ("&#8451;")).addClass("temperature");
    $(weather_data).append(newTempElement);
    
    var weatherDiv = $("<div></div>").addClass("weatherDiv");
    $(weather_data).append(weatherDiv);

    var newWeatherElement = $("<p id='weather'></p>").html(obj.weather[0].main).addClass("weather");
    $(weatherDiv).append(newWeatherElement);
    
    var iconUrl = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
    var iconElement = $("<img>").attr("src", iconUrl);
    $(weatherDiv).append(iconElement);

    var newHumidityElement = $("<p></p>").html("Humidity: " + obj.main.humidity + "%").addClass("humidity");
    $(weather_data).append(newHumidityElement);

    var newWindSpElement = $("<p></p>").html("Wind speed: " + obj.wind.speed + " m/s").addClass("windspeed");
    $(weather_data).append(newWindSpElement);
    
    backgroundAssign(document.getElementById("weather"));
}

function backgroundAssign(element) {
    
    if (element.innerHTML == "Rain") {
        $("#body").css("background-image", "url(rain.jpg)").css("color", "white");
    } else if (element.innerHTML == "Clear") {
        $("#body").css("background-image", "url(sun.jpg)");
    } else if (element.innerHTML == "Mist" || element.innerHTML == "Haze" || element.innerHTML == "Fog") {
        $("#body").css("background-image", "url(mist.jpg)");
    } else if (element.innerHTML == "Sunny") {
        $("#body").css("background-image", "url(sunny.jpg)");
    } else if (element.innerHTML == "Thunderstorm") {
        $("#body").css("background-image", "url(lightning.jpg)");
    } else if (element.innerHTML == "Clouds") {
        $("#body").css("background-image", "url(clouds1.jpg)");
    } else if (element.innerHTML == "Drizzle") {
        $("#body").css("background-image", "url(drizzle.jpg)");
    } else if (element.innerHTML == "Snow") {
        $("#body").css("background-image", "url(snow.jpg)");
    }
}
