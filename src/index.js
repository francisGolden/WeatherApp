import './style.css';

let fetchURL = "https://api.openweathermap.org/data/2.5/weather?q=London&APPID=3fc4df175cc8ba6e45de7d3a75fc0a64"
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


form.addEventListener("submit", e=>{
    box.innerHTML = ""
    e.preventDefault();
    newUrl = `https://api.openweathermap.org/data/2.5/weather?q=${form.city.value}&APPID=3fc4df175cc8ba6e45de7d3a75fc0a64&units=metric`
    console.log(newUrl)

    fetchSync = async() => {
        response = await fetch(newUrl, {mode:"cors"})
        data = await response.json()
        console.log(data)
    
        result = new info(
            city = data.name,
            weather = data.weather[0].main,
            description = data.weather[0].description,
            latitude = data.coord.lat,
            longitude = data.coord.lon,
            timezone = data.timezone,
            wind = data.wind.speed, 
            temperature = `${data.main.temp}°`
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
        console.log(result[property])
        
    }
}
