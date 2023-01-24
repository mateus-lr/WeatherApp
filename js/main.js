// Variables
import { apiKey } from "./api.js";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const day = new Date().toLocaleString('pt-BR', {
  weekday: 'long'
});
const showInfoElement = document.querySelector("#info-container");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const windElement = document.querySelector("#wind span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const today = document.querySelector("#today span");


// Functions

// function that acess the API weather
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
}

// function that shows the API weather
const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed} km/h`;
  today.innerText = day;
}

const showInfo = () => {
  showInfoElement.classList.remove("hide");
};

const hideInfo = () => {
  showInfoElement.classList.add("hide");
};

const eraseInput = () => {
  cityInput.value = "";
};

// Events

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
  showInfo();
});

cityInput.addEventListener("focus", (e) => {
  hideInfo();
  eraseInput();
});

window.addEventListener("keydown", (e) => {
  const value = e.key

  if (value === "Enter") {
    const city = cityInput.value;

    showWeatherData(city);
    showInfo();
  }
});

cityInput.addEventListener("keydown", function (e) {
  var keyCode = (e.keyCode ? e.keyCode : e.which);

  if (keyCode > 47 && keyCode < 58) {
    e.preventDefault();
  }
});