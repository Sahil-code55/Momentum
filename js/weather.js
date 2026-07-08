
            const navWeather = document.getElementById("navWeather");
const weatherWidget = document.getElementById("weatherWidget");
const widgetTemp = document.getElementById("widgetTemp");
const widgetCondition = document.getElementById("widgetCondition");
const widgetHumidity = document.getElementById("widgetHumidity");
const widgetWind = document.getElementById("widgetWind");
const widgetFeelsLike = document.getElementById("widgetFeelsLike");
const widgetLocation = document.getElementById("widgetLocation");




// Helper function to map Open-Meteo WMO Codes to human-readable text strings
function getWeatherDescription(code) {
    if (code === 0) return "Sunny";
    if ([1, 2, 3].includes(code)) return "Partly Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "Rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Cloudy";
}
navigator.geolocation.getCurrentPosition(
    async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch temperature
       const weatherResponse = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
);

        const weatherData = await weatherResponse.json();
        
        
    const current = weatherData.current
    const temperature = current.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const wind = current.wind_speed_10m;
    const feelsLike = current.apparent_temperature;
    const weatherCode = current.weather_code;
    const description = getWeatherDescription(weatherCode);

        // Fetch city name
        const locationResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
        );

        const locationData = await locationResponse.json();

        const city =
            locationData.address.city ||
            locationData.address.town ||
            locationData.address.village ||
            locationData.address.country ||
            locationData.address.state;
          
         
        const country  = locationData.address.country    

        navWeather.textContent = `${temperature}°C, ${city}`;
        widgetTemp.textContent = `${temperature}°C`;
        widgetCondition.textContent =description;
        widgetHumidity.textContent = `${humidity}`;
        widgetWind.textContent = `${wind} km/h`;
        widgetFeelsLike.textContent = `${feelsLike}°C`;
        widgetLocation.textContent = `${city}, ${country}`;


    },
    (error) => {
        navWeather.textContent = "Location unavailable";
        widgetTemp.textContent = "Location unavailable";
        console.error(error);
    }
);