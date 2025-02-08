const weatherForm = document.querySelector(".weatherform")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "2d46e3eb64cf322c24fe7a48bdec2be6"

weatherForm.addEventListener("submit", async event=>{

    event.preventDefault()

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    }
    else{
        displayError("Please enter a city")
    }
})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    if(!response.ok){
        throw new Error("Could not fetch weaher data")
    }
    return await response.json()
}

function displayWeatherInfo(data){
    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data
    card.textContent = ""
    card.style.display = "flex"

        const cityDispay = document.createElement("h1")
        const tempDispay = document.createElement("p")
        const humidityDisplay = document.createElement("p")
        const descDispay = document.createElement("p")
        const weatherEmoji = document.createElement("p")

        cityDispay.textContent = city
        tempDispay.textContent = `${(temp -273.15).toFixed(1)}°C`
        humidityDisplay.textContent = `Humidity: ${humidity}%`
        descDispay.textContent = description
        weatherEmoji.textContent = getWeatherEmoji(id)


        cityDispay.classList.add("cityDisplay")
        tempDispay.classList.add("tempDisplay")
        humidityDisplay.classList.add("humidityDisplay")
        descDispay.classList.add("descDisplay")
        weatherEmoji.classList.add("weatherEmoji")

        card.appendChild(cityDispay)
        card.appendChild(tempDispay)
        card.appendChild(humidityDisplay)
        card.appendChild(descDispay)
        card.appendChild(weatherEmoji)

}   
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"
        case (weatherId >= 500 && weatherId < 600):
            return "❄️"
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"
       case (weatherId === 800):
            return "☀️" 
        case (weatherId >= 801 && weatherId < 810):
            return "☁️"
        default:
            return "❓"

    }
}
function displayError(message){
    const errorDispay = document.createElement("p")
    errorDispay.textContent = message
    errorDispay.classList.add("errorDisplay")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDispay)
}