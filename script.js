const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationError = document.querySelector('.location-error');
const weatherBody = document.querySelector('.weather-body');


async function checkWeather(city){
    const apiKey = "615594ace1c8d277e3e0d43105556049";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const weatherData = await fetch(`${url}`).then(response => response.json());

    // console.log(weatherData);

    if(weatherData.cod === `404`){
        // alert('City not found');
        weatherBody.style.display = "none";
        locationError.style.display = "flex";
        return;
    }

    locationError.style.display = "none";
    weatherBody.style.display = "flex";

    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;

    description.innerHTML = `${weatherData.weather[0].description}`;
    // console.log(weatherData.weather[0].description);

    humidity.innerHTML = `${weatherData.main.humidity}%`;

    windSpeed.innerHTML = `${weatherData.wind.speed} Km/hr`;

    switch(weatherData.weather[0].main){
        case 'Clear':
            weatherImg.src = "/assets/clear.png";
            break;
        case 'Clouds':
            weatherImg.src = "/assets/cloud.png";
            break;
        case 'Rain':
            weatherImg.src = "/assets/rain.png";
            break;
        case 'Snow':
            weatherImg.src = "/assets/snow.png";
            break;
        case 'Mist':
            weatherImg.src = "/assets/mist.png";
            break;
    }


}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});