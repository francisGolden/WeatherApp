import './style.css';

let fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3fc4df175cc8ba6e45de7d3a75fc0a64"
let container = document.querySelector("#container")
let box = document.querySelector("#box")
box.style.gridTemplateColumns = ""


let weather;
let description;
let result;
let city;
let latitude;
let longitude;
let timezone;
let wind;
let temperature;

/*city object constructor*/
class info {
    constructor(city, weather, description, latitude, longitude, timezone, wind, temperature){
        this.city = city
        this.weather = weather
        this.description = description
        this.latitude = latitude
        this.longitude = longitude
        this.timezone = timezone
        this.wind = wind
        this.temperature = temperature
    }
}

let row;
let response;
let data;
let i;
let form = document.querySelector("#form")
let newUrl;
let fetchSync;

/*once I submit the form...*/
form.addEventListener("submit", e=>{
    box.innerHTML = ""
    e.preventDefault();
    /*generate a new URL with the searched for city*/
    newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${form.city.value}&APPID=3fc4df175cc8ba6e45de7d3a75fc0a64&units=metric`
    /*console.log(newUrl)*/
    
    /*create a new async function*/
    fetchSync = async() => {
        
      response = await fetch(newUrl, {mode:"cors"})
        data = await response.json()
        /*console.log(data)*/
    
        result = new info(
            city = data.name,
            weather = data.weather[0].main,
            description = data.weather[0].description,
            latitude = data.coord.lat,
            longitude = data.coord.lon,
            timezone = `${data.timezone} shift in seconds from UTC`,
            wind = `${data.wind.speed} meter/sec`, 
            temperature = `${data.main.temp}°C`
        )
        
        createBox()
    }
    fetchSync()
})



// 

const createBox = () => {
    box.style.gridTemplateColumns = "1fr 1fr"
    // box.style.minWidth = "fit-content"
    for (const property in result){
        row = document.createElement("div")
        row.setAttribute("id",`${property}`)
        row.setAttribute("class", "row")
        row.innerHTML = `${property}<div class="content">${result[property]}</div>`
        box.insertAdjacentElement("beforeend", row)
        if (result.weather == "Clear"){
          container.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/0/08/Weather_icon_-_sunny.svg")'
        } else if (result.description == "scattered clouds" || result.description == "few clouds" || result.description == "broken clouds"){
          container.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/3/30/Weather_icon_-_sunny_to_cloudy.svg")'
        } else if (result.description == "overcast clouds"){
          container.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/d/d5/Weather_icon_-_overcast.svg")'
        } else if (result.weather == "Rain"){
          container.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/4/40/Weather_icon_-_showers.svg")'
        }
        /*console.log(result[property])*/
        
    }
    console.log(result.weather)
}