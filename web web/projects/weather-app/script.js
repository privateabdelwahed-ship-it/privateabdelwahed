// Weather App with OpenWeatherMap API
// Note: This is a demo. For production, you'll need to get a free API key from openweathermap.org

const API_KEY = 'demo_key'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const dateTime = document.getElementById('date-time');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const errorMessage = document.getElementById('error-message');
const cityButtons = document.querySelectorAll('.city-btn');

// Weather icon mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// Initialize
function init() {
    searchBtn.addEventListener('click', searchWeather);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
    
    cityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const city = btn.getAttribute('data-city');
            cityInput.value = city;
            searchWeather();
        });
    });
    
    // Load default city
    searchWeather('London');
}

// Search Weather
async function searchWeather(city = null) {
    const cityNameValue = city || cityInput.value.trim();
    
    if (!cityNameValue) {
        showError('Please enter a city name!');
        return;
    }
    
    hideError();
    
    try {
        // For demo purposes, we'll use mock data
        // In production, uncomment the fetch and use your API key
        /*
        const response = await fetch(
            `${API_URL}?q=${cityNameValue}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        displayWeather(data);
        */
        
        // Mock data for demo
        const mockData = generateMockWeather(cityNameValue);
        displayWeather(mockData);
        
    } catch (error) {
        showError('Unable to fetch weather data. Please try again.');
        console.error('Error:', error);
    }
}

// Generate Mock Weather Data (for demo)
function generateMockWeather(city) {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Sunny', 'Partly Cloudy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const baseTemp = 15 + Math.floor(Math.random() * 20);
    
    return {
        name: city,
        main: {
            temp: baseTemp,
            feels_like: baseTemp - 2,
            humidity: 50 + Math.floor(Math.random() * 30),
            pressure: 1000 + Math.floor(Math.random() * 50)
        },
        wind: {
            speed: Math.floor(Math.random() * 20)
        },
        weather: [{
            main: randomCondition,
            description: randomCondition.toLowerCase(),
            icon: '01d'
        }],
        dt: Date.now() / 1000
    };
}

// Display Weather
function displayWeather(data) {
    cityName.textContent = data.name;
    
    // Update date/time
    const now = new Date();
    dateTime.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Update icon
    const iconCode = data.weather[0].icon;
    weatherIcon.textContent = weatherIcons[iconCode] || '🌤️';
    
    // Update temperature
    temp.textContent = Math.round(data.main.temp);
    
    // Update description
    description.textContent = data.weather[0].description;
    
    // Update details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
}

// Show Error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Hide Error
function hideError() {
    errorMessage.classList.remove('show');
}

// Initialize
init();

