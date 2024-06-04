const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "091ec4abcd9d4812b82608db0fb93b19";
const titemo = document.getElementById("titemo");
 
weatherForm.addEventListener("submit",async event=>{
   event.preventDefault();
   const city = cityInput.value;
   if(city){
      try{
         const WeatherData = await getWeatherData(city);
         console.log(city);
         displayWeatherInfo(WeatherData);
      }
      catch(error){
         console.error(error);        
         displayError("City not found. Please enter a valid city.");
      }
   }
   else{
      displayError("Please enter a city.");
   }
});

async function getWeatherData(city){
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

   const response = await fetch(apiUrl);
   if(!response.ok){
      throw new Error("city not found");
   }
   return await response.json();
}

function displayWeatherInfo(data){
   const {name:city, main:{temp,humidity}, weather:[{description,id}]} = data;

   
   const cityDisplay = document.createElement("h1");
   const tempDisp = document.createElement("p");
   const humidDisp = document.createElement("p");
   const descDisp = document.createElement("p");
   const weatherEmoji = document.createElement("p");

   cityDisplay.textContent = city;
   cityDisplay.classList.add("cityDisp");

   tempDisp.textContent = ` ${(temp-273.15).toFixed(1)}°C`;
   tempDisp.classList.add("tempDisp");

   humidDisp.textContent = `Humidity: ${humidity}%`;
   humidDisp.classList.add("humidDisp");

   descDisp.textContent = description;
   descDisp.classList.add("descDisp");

   weatherEmoji.textContent = getWeatherEmoji(id);
   weatherEmoji.classList.add("weatherEmoji");
   titemo.textContent = getWeatherEmoji(id);

   card.textContent="";
   card.appendChild(cityDisplay);
   card.appendChild(tempDisp);
   card.appendChild(humidDisp);
   card.appendChild(descDisp);
   card.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherId) {
   if (weatherId >= 200 && weatherId < 300) {
      return "⛈️"; 
   } 
   else if (weatherId >= 300 && weatherId < 400) {
      return "🌧️"; 
   } 
   else if (weatherId >= 500 && weatherId < 600) {
      return "🌧️"; 
   } 
   else if (weatherId >= 600 && weatherId < 700) {
      return "❄️"; 
   }
    else if (weatherId >= 700 && weatherId < 800) {
      return "🌫️"; 
   } 
   else if (weatherId === 800) {
      return "☀️";
   } 
   else if (weatherId > 800) {
      return "☁️"; 
   } 
   else {
      return "";
   }
}
function displayError(message){
const errorDisp = document.createElement("p");
errorDisp.textContent = message;
errorDisp.classList.add("errorDisp");

card.textContent="";
card.style.display = "flex";
card.appendChild(errorDisp);

}