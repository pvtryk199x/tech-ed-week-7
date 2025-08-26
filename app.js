// script.js
document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.getElementById("city").value.trim();
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "<p>Loading...</p>";

  const apiKey = "YOUR_API_KEY_HERE"; // Replace with your real key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    
    const data = await response.json();

    const weather = data.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    resultsSection.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>${Math.round(data.main.temp)}°C</strong></p>
      <p>${weather.description}</p>
      <img src="${iconUrl}" alt="${weather.description}">
    `;
  } catch (error) {
    resultsSection.innerHTML = `<p>⚠️ ${error.message}</p>`;
  }
});