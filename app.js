document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = document.getElementById("city").value.trim();
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "<p>Please wait...</p>"; 
  const apiKey = "125902ef72ba174d77cb76fd44ef8cf5"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message || "Try Again...");
    }

    const weather = data.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    resultsSection.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>${Math.round(data.main.temp)}°C</p>
      <p>${weather.description}</p>
   
    `;
  } catch (error) {
    resultsSection.innerHTML = `<p> ${error.message}</p>`;
  }
});