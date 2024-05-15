"use strict";

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(showPosition){
        let lat = showPosition.coords.latitude;
        let lon = showPosition.coords.longitude;

        printForecast(lat, lon);
    }, function (error) {
        console.log(error);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// fetch weather forecast from position

async function getForecast(lat, lon) {
    try {
        let response = await fetch('https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=EdHYLEDxxZiqmDxVoD7NUJn91icR7ZFY');

        return await response.json();

    } catch (error) {
        console.log("Something went wrong" + error);
    }
}

// print forecast to the screen

async function printForecast(lat, lon) {
    try {
        let data = await getForecast(lat, lon);

        let weatherEL = document.getElementById('weather');
        weatherEL.innerHTML = '';

        let daily = data.timelines.daily;

        // print daily forecast
        daily.forEach(day => {
            let dateForm = formatDate(day.time);

            weatherEL.innerHTML += `
            <article>
            <h2>${dateForm}</h2>
            <p>Max: ${day.values.temperatureMax}&#8451
            <br>Min: ${day.values.temperatureMin}&#8451
            </p>
            <img src="../images/${day.values.weatherCodeMax}.png">
            </article>
            `;
    });
}
    catch (error) {
        console.log("Something went wrong" + error);
    }

}

// format date to dd/mm
function formatDate(dateString) {
    let d = new Date(dateString);
    let day = d.getDay();
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let month = d.getMonth() + 1;
    let days = d.getDate();

    return `${weekdays[day]} ${days}/${month}`;
}

export { getLocation };