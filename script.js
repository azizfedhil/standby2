const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const weatherIconElement = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weather-description');
const batteryIconElement = document.getElementById('battery-icon');
const batteryLevelElement = document.getElementById('battery-level');
const container = document.getElementById('standby-container');

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
}

async function updateWeather() {
    // IMPORTANT: Replace with your own API key from a weather provider
    const apiKey = 'YOUR_API_KEY';
    const city = 'New York'; // Change to your desired city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const iconCode = data.weather[0].icon;
        weatherIconElement.style.backgroundImage = `url('http://openweathermap.org/img/wn/${iconCode}@2x.png')`;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°`;
        weatherDescriptionElement.textContent = data.weather[0].main;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDescriptionElement.textContent = 'Weather Error';
    }
}

async function updateBattery() {
    try {
        const battery = await navigator.getBattery();

        const updateBatteryUI = () => {
            const level = Math.floor(battery.level * 100);
            batteryLevelElement.textContent = `${level}%`;

            const batteryLevelIndicator = document.createElement('div');
            batteryLevelIndicator.id = 'battery-level-indicator';
            batteryLevelIndicator.style.width = `${level}%`;
            batteryIconElement.innerHTML = '';
            batteryIconElement.appendChild(batteryLevelIndicator);

            if (battery.charging) {
                batteryLevelIndicator.style.backgroundColor = '#4cd964'; // Green when charging
            } else if (level <= 20) {
                batteryLevelIndicator.style.backgroundColor = '#ff3b30'; // Red when low
            } else {
                batteryLevelIndicator.style.backgroundColor = '#fff';
            }
        };

        updateBatteryUI();

        battery.addEventListener('chargingchange', updateBatteryUI);
        battery.addEventListener('levelchange', updateBatteryUI);
    } catch (error) {
        console.error('Battery API not supported:', error);
        batteryLevelElement.textContent = 'N/A';
    }
}

function pixelRotation() {
    let x = 0;
    let y = 0;
    const maxOffset = 5; // pixels

    setInterval(() => {
        x = Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset;
        y = Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset;
        document.body.style.transform = `translate(${x}px, ${y}px)`;
    }, 5000); // 5 seconds
}

// Initial calls
updateTime();
updateWeather();
updateBattery();
pixelRotation();

// Update time every second
setInterval(updateTime, 1000);

// Update weather every 15 minutes
setInterval(updateWeather, 900000);