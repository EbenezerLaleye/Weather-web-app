const weather = {
    "apiKey": "7c0ec1b6164497f674210bea86ac5e3d"
}
const search = document.querySelector("#search-input")
const weatherForm = document.querySelector("#weather-form")
const cityName = document.querySelector("#city-name")
const temprature = document.querySelector("#temp")
const weatherIcon = document.querySelector("#weather-icon")
const description = document.querySelector("#description")
const humPercet = document.querySelector("#hum-percent")
const windSpeed = document.querySelector("#wind-speed")


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchMethod(search.value)
    search.value = ""
})
async function searchMethod(city) {
    console.log(city)
    cityName.innerHTML = city;
    let data = await getWeatherInfo(city)
    displayWeatherInfo(data)
}
async function getWeatherInfo(city) {

    let latLon = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weather.apiKey}`)
    // console.log(latLon)
    let lat = latLon.data[0].lat
    let lon = latLon.data[0].lon
    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather.apiKey}`)

    return res

}

function displayWeatherInfo(weatherData) {
    console.log(weatherData)
    // cityName.innerHTML = search.value;
    temprature.innerHTML = `${Math.round(weatherData.data.main.temp - 273.15)}°c`
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`
    description.innerHTML = weatherData.data.weather[0].description;
    humPercet.innerHTML = `${weatherData.data.main.humidity}%`
    windSpeed.innerHTML = `${Math.round(weatherData.data.wind.speed * 3.6)}KM/h`
    document.querySelector(".weather-info").classList.remove("loading")

}

searchMethod("Milan")