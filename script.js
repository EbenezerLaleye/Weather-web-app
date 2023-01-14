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
const forecast = document.querySelector("#forecast")
// const dailyForecast = document.querySelectorAll(".daily-forecast")
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    forecast.innerHTML = ""

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
    try {
        let latLon = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weather.apiKey}`)
        let lat = latLon.data[0].lat
        let lon = latLon.data[0].lon
        let res = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${weather.apiKey}`)
        return res

    } catch (e) {
        console.log("caught an Error")
        console.log("Error is: ", e)
    }

}


function displayWeatherInfo(weatherData) {
    // console.log(weatherData)
    // cityName.innerHTML = search.value;
    temprature.innerHTML = `${Math.round(weatherData.data.current.temp - 273.15)}°c`
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.data.current.weather[0].icon}@2x.png`
    description.innerHTML = weatherData.data.current.weather[0].description;
    humPercet.innerHTML = `${weatherData.data.current.humidity}%`
    windSpeed.innerHTML = `${Math.round(weatherData.data.current.wind_speed * 3.6)}KM/h`
    document.querySelector(".weather-info").classList.remove("loading")
    getDay(weatherData)

}
function getDay(weatherData) {
    for (let i = 0; i <= 5; i++) {
        const timeUnix = weatherData.data.daily[i].dt
        const milisecs = timeUnix * 1000;
        const date = new Date(milisecs)
        // return date.getDay()
        createForecast(weatherData, date.getDay())
    }



}

function createForecast(weatherData, day) {
    // console.log(weatherData)
    const newForecast = document.createElement("div")
    newForecast.classList.add("daily-forecast")
    const newDay = document.createElement("h3")
    newDay.classList.add("days")
    newDay.innerHTML = days[day]
    const newImg = document.createElement("img");
    newImg.classList.add("weather-icon")
    newImg.src = `https://openweathermap.org/img/wn/${weatherData.data.daily[day].weather[0].icon}@2x.png`
    const newTemp = document.createElement("h3")
    newTemp.classList.add("daily-temp");
    newTemp.innerHTML = `${Math.round(weatherData.data.daily[day].temp.day - 273.15)}°c`;
    const newDes = document.createElement("h4")
    newDes.classList.add("description");
    newDes.innerHTML = weatherData.data.daily[day].weather[0].description

    newForecast.append(newDay)
    newForecast.append(newImg)
    newForecast.append(newTemp)
    newForecast.append(newDes)

    forecast.append(newForecast)


}


// displayForcast()

searchMethod("madrid")
