const apiKey = 'bf822b324af1f823bcf808a183a5833c';
const lat = '39.8283';  // Latitude of Forked River, NJ
const lon = '-74.1993';  // Longitude of Forked River, NJ
const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=${apiKey}`;

// Map of weather conditions to custom icons
const iconMap = {
    'Clear': 'clear.png',
    'Clouds': 'cloudy.png',
    'Rain': 'rain.png',
    'Snow': 'snow.png',
    'Thunderstorm': 'thunderstorm.png',
    'Drizzle': 'drizzle.png',
    'Mist': 'mist.png',
    'Haze': 'haze.png',
    'Broken Clouds': 'broken-clouds.png'
    // Add more mappings as needed for other weather conditions
};

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data.daily);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(forecast) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = '';

    forecast.forEach((day, index) => {
        if (index < 7) {  // Limit to 7 days
            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');

            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short'  // Show only the short weekday (Mon, Tue, etc.)
            });

            // Get the weather description from the API
            const weatherDescription = day.weather[0].main;  // E.g., 'Clear', 'Clouds', 'Rain'

            // Use your custom icons based on the weather description
            const customIcon = iconMap[weatherDescription] || 'default.png';  // Fallback to default icon

            const iconPath = `./images/icons/${customIcon}`;  // Path to the custom icon

            // Round the temperature
            const roundedTemp = Math.round(day.temp.day);

             // Round the temperature
             const roundedHighTemp = Math.round(day.temp.day);
             const roundedLowTemp = Math.round(day.temp.min)
 
             // round wind
             const roundedWind = Math.round(day.wind_speed)
 

            weatherCard.innerHTML = `
                <h3>${date}</h3>
                <img src="${iconPath}" alt="${weatherDescription}">
                <div class="weather-details">
                    <p>${roundedHighTemp}°</p>
                    <div class="lowtemp">
                    <p>${roundedLowTemp}°</p>
                    <div class="humidity"><p>${day.humidity}%</p></div>
                    </div>
                   
                </div>
            `;
           
            weatherContainer.appendChild(weatherCard);
        }
    });
}



document.addEventListener('DOMContentLoaded', fetchWeather);
