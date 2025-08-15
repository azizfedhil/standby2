const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const dateElement = document.getElementById('date');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weather-description');

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);
}

function getWeatherInfo(code, isDay) {
    const weatherMap = {
        0: { desc: 'Clear Sky', icon: isDay ? 'sunny' : 'clear' },
        1: { desc: 'Mainly Clear', icon: isDay ? 'partly-cloudy' : 'cloudy' },
        2: { desc: 'Partly Cloudy', icon: isDay ? 'partly-cloudy' : 'cloudy' },
        3: { desc: 'Overcast', icon: 'cloudy' },
        45: { desc: 'Fog', icon: 'fog' },
        48: { desc: 'Depositing Rime Fog', icon: 'fog' },
        51: { desc: 'Light Drizzle', icon: 'drizzle' },
        53: { desc: 'Moderate Drizzle', icon: 'drizzle' },
        55: { desc: 'Dense Drizzle', icon: 'drizzle' },
        61: { desc: 'Slight Rain', icon: 'rain' },
        63: { desc: 'Moderate Rain', icon: 'rain' },
        65: { desc: 'Heavy Rain', icon: 'rain' },
        80: { desc: 'Slight Rain Showers', icon: 'showers' },
        81: { desc: 'Moderate Rain Showers', icon: 'showers' },
        82: { desc: 'Violent Rain Showers', icon: 'showers' },
        95: { desc: 'Thunderstorm', icon: 'thunderstorms' },
    };
    const info = weatherMap[code] || { desc: 'Unknown', icon: 'cloudy' };
    // Using Meteocons SVG icons via jsDelivr CDN
    const iconUrl = `https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/svg/${info.icon}.svg`;
    return { description: info.desc, iconUrl };
}

async function fetchWeatherData(lat, lon) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const data = await response.json();
        const currentWeather = data.current_weather;
        const isDay = currentWeather.is_day === 1;

        const { description, iconUrl } = getWeatherInfo(currentWeather.weathercode, isDay);

        temperatureElement.textContent = `${Math.round(currentWeather.temperature)}°`;
        weatherDescriptionElement.textContent = description;
        weatherIconElement.style.backgroundImage = `url('${iconUrl}')`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDescriptionElement.textContent = 'Weather Error';
    }
}

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error.message);
                // Default to Cupertino if location is denied
                fetchWeatherData(37.323, -122.0322); 
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
        // Default to Cupertino if geolocation is not available
        fetchWeatherData(37.323, -122.0322);
    }
}


function pixelRotation() {
    let x = 0;
    let y = 0;
    const maxOffset = 4; // pixels

    setInterval(() => {
        x = Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset;
        y = Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset;
        document.body.style.transform = `translate(${x}px, ${y}px)`;
    }, 5000);
}

// Initial calls
updateTime();
getLocationAndWeather();
pixelRotation();

// Update time every second
setInterval(updateTime, 1000);

// Update weather every 15 minutes
setInterval(getLocationAndWeather, 900000);
