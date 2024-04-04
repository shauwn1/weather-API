document.addEventListener("DOMContentLoaded", function () {
    const sriLankaMap = document.getElementById("sriLankaMap");
    const weatherInfo = document.getElementById("weather-info");

    sriLankaMap.addEventListener("load", function () {
        const svgDoc = sriLankaMap.contentDocument;
        const provinces = svgDoc.querySelectorAll("path");

        provinces.forEach((province) => {
            province.addEventListener("mouseenter", async () => {
                const provinceName = province.id;
                const weatherData = await fetchWeatherData(provinceName);
                displayWeatherInfo(provinceName, weatherData);
            });

            province.addEventListener("mouseleave", () => {
                weatherInfo.innerHTML = "<p>Hover over a province to see the weather.</p>";
            });
        });
    });
});

async function fetchWeatherData(province) {
    try {
        const response = await fetch(`http://localhost:3000/weather/province/${province}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function displayWeatherInfo(province, data) {
    if (data) {
        document.getElementById("weather-info").innerHTML = `
            <h2>${province} Province</h2>
            <p>Temperature: ${data.temperature} °C</p>
            <p>Humidity: ${data.humidity} %</p>
            <p>Air Pressure: ${data.air_pressure} hPa</p>
        `;
    } else {
        document.getElementById("weather-info").innerHTML = "<p>Weather data not available.</p>";
    }
}
