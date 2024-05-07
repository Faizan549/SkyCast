let cityName = document.querySelector(".weather_city");
// cityName.textContent = "London, United Kingdom"


let inputField = document.querySelector(".search-bar")
console.log(inputField)

inputField.addEventListener("keypress", function(e){
    city = inputField.value
    if(e.key === "Enter"){
        getWeatherData();
        inputField.value = ""; // Clear the input field
    }
})


let weatherDateTime = document.querySelector(".weather_date_time")
// weatherDateTime.innerHTML = "Friday, February 23, 2024 at 10:37 AM"

let temperature = document.querySelector(".current-temp")
// temperature.innerHTML = "278°"

let cloud = document.querySelector(".fa-cloud")
let minTemp = document.querySelector(".min-temp")
// minTemp.innerHTML = "Min: 277°"

let maxTemp = document.querySelector(".max-temp")
// maxTemp.innerHTML = "Max: 279°"

let weatherCondition = document.querySelector(".weatherCondition")
let weatherIcon = document.querySelector(".weather-icon")

let weatherFeel = document.querySelector(".detail1");
let weatherHumidity = document.querySelector(".detail2");
let weatherWind = document.querySelector(".detail3");
let weatherPressure = document.querySelector(".detail4");


let getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);

}

let getTimeFormat = (dt) => {
    let milliseconds = dt;
    let rawDate = new Date(milliseconds);
    let options = {
        weekday: 'long', // Full weekday name (e.g., "Friday")
        year: 'numeric', // Full year (e.g., "2024")
        month: 'long', // Full month name (e.g., "March")
        day: 'numeric', // Day of the month (e.g., "23")
        hour: 'numeric', // Hour (e.g., "10")
        minute: '2-digit', // Minute (e.g., "20")
        hour12: true // Use 12-hour format (AM/PM)
    }

    let dateTimeFormat = rawDate.toLocaleString("en-US", options)
    return dateTimeFormat
}

// let getWeatherData = async () =>{

//     let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=pune&APPID=c0a01e693b97187e7999decc9fbce455`
//     try {
//         let res = await fetch(weatherApi);
//         let  data = await res.json(); 
//         console.log(data)

//     } catch (error) {
//         console.log(error)
//     }
// }
let city = "Lahore"

let getWeatherData = async () => {
    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c0a01e693b97187e7999decc9fbce455`;
    try {
        let res = await fetch(weatherApi);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        let data = await res.json();
        console.log(data);
        let { main, name, weather, wind, sys, dt } = data
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`
        weatherDateTime.innerHTML = getTimeFormat(dt)
        temperature.innerHTML = `${main.temp.toFixed()}&#176`
        maxTemp.innerHTML = `Min : ${main.temp_max.toFixed()}&#176`
        minTemp.innerHTML = `Max : ${main.temp_min.toFixed()}&#176`
        weatherFeel.innerHTML = `Feels Like : ${main.feels_like}&#176`
        weatherHumidity.innerHTML = `Humidity : ${main.humidity}%`
        weatherWind.innerHTML = `Wind : ${wind.speed} m/s`
        weatherPressure.innerHTML = `Pressure : ${main.pressure}hPa`
        weatherCondition.innerHTML = `${weather[0].main}`
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="">`


    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// Call the function to fetch weather data
getWeatherData();




// document.body.addEventListener("load", getWeatherData)


