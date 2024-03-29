function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#location-display").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "d2e644852be06538dbf609c7179c2f4a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}

function searchPlace(position) {
  let apiKey = "d2e644852be06538dbf609c7179c2f4a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentLocation(searchPlace);
}

function tempCelsius(event) {
  event.preventDefault();
  let degreeCelsius = document.querySelector("#temperature");
  degreeCelsius.innerHTML = "24";
}

function tempFahrenheit(event) {
  event.preventDefault();
  let degreeFahrenheit = document.querySelector("#temperature");
  degreeFahrenheit.innerHTML = "75.2";
}

// Add Date & Time
let currentDate = new Date();
let displayDate = document.querySelector("#today-date");
displayDate.innerHTML = formatDate(currentDate);

// Search Location
let searchLocation = document.querySelector("form");
searchLocation.addEventListener("submit", searchButton);

let currentLocationButton = document.querySelector("#current-location-input");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Display Temperature
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tempCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", tempFahrenheit);

searchCity("Singapore");
