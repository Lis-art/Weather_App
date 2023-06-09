
let monate = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
];

//=============================================

let windDirection;

const windDirections = [
    { min: 349, max: 11, direction: "North" },
    { min: 12, max: 33, direction: "North-Northeast" },
    { min: 34, max: 56, direction: "Northeast" },
    { min: 57, max: 78, direction: "East-Northeast" },
    { min: 79, max: 101, direction: "East" },
    { min: 102, max: 123, direction: "East-Southeast" },
    { min: 124, max: 146, direction: "Southeast" },
    { min: 147, max: 168, direction: "South-Southeast" },
    { min: 169, max: 191, direction: "South" },
    { min: 192, max: 213, direction: "South-Southwest" },
    { min: 214, max: 236, direction: "Southwest" },
    { min: 237, max: 258, direction: "West-Southwest" },
    { min: 259, max: 281, direction: "West" },
    { min: 282, max: 303, direction: "West-Northwest" },
    { min: 304, max: 326, direction: "Northwest" },
    { min: 327, max: 348, direction: "North-Northwest" }
];

function getWindDirection(degrees) {
  const direction = windDirections.find((item) => {
    return degrees >= item.min && degrees <= item.max;
  });

  return direction ? direction.direction : "";
}

//=============================================


const apiKey = "2732b54b60c08dad4aa20e1b6fc1aacc";
const section = document.querySelector("section");
const inputWrapper = document.querySelector(".input-wrapper");
const figure = document.querySelector("figure");

const showWeather = () => {
    event.preventDefault();
    inputWrapper.style.top = "-50rem";
    figure.style.bottom = "0";
    section.innerHTML = "";

    const cityInput = document.querySelector("#cityInput").value;
    console.log({cityInput});

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let lat = data[0].lat;
        let lon = data[0].lon;
        console.log({lat}, {lon});

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            
            const city = data.name;
            const temperature = data.main.temp;
            const timezone = data.timezone;
            const windDeg = data.wind.deg;
            const windSpeed = data.wind.speed;
            const cloudiness = data.weather[0].description;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const sunrise = data.sys.sunrise;
            let sunriseTime = new Date((sunrise + timezone) * 1000).toUTCString();
            sunriseTime = sunriseTime.slice(-12, -7);
            const sunset = data.sys.sunset;
            let sunsetTime = new Date((sunset + timezone) * 1000).toUTCString();
            sunsetTime = sunsetTime.slice(-12, -7);
            const geocoords = data.coord;
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const monthName = monate[month];
            const celsius = Math.round(temperature - 273.15);
            lat = lat.toFixed(2);
            lon = lon.toFixed(2);
        
            console.log({sunriseTime}, {sunsetTime},{timezone}, {windDeg}, {windSpeed}, {cloudiness}, {pressure}, {humidity}, {sunrise}, {sunset}, {geocoords}, {temperature}, {city}, {day}, {monthName}, {year});

            const icon = data.weather[0].icon;
            console.log({icon});
            const firstTwoChar = icon.slice(0, 2);
            const lastChar = icon.slice(2);
            console.log({firstTwoChar}, {lastChar});

            if (lastChar == "d"){
                if (firstTwoChar == "01"){
                    iconSource = "../assets/img/Sun.png";
                } else if(firstTwoChar == "02"){
                    iconSource = "../assets/img/CloudySun.png";
                } else if (firstTwoChar == "03"){
                    iconSource = "../assets/img/Clouds.png";
                } else if (firstTwoChar == "04"){
                    iconSource = "../assets/img/DarkCloud.png";
                } else if (firstTwoChar == "09"){
                    iconSource = "../assets/img/RainCloud.png";
                } else if (firstTwoChar == "10"){
                    iconSource = "../assets/img/SunRain.png";
                } else if (firstTwoChar == "11"){
                    iconSource = "../assets/img/Thunderstorm.png";
                } else if (firstTwoChar == "13"){
                    iconSource = "../assets/img/Snow.png";
                } else if (firstTwoChar == "50"){
                    iconSource = "../assets/img/Wind.png";
                }
            } else if (lastChar == "n"){
                if (firstTwoChar == "01"){
                    iconSource = "../assets/img/ClearNight.png";
                } else if(firstTwoChar == "02"){
                    iconSource = "../assets/img/CloudyNight.png";
                } else if (firstTwoChar == "03"){
                    iconSource = "../assets/img/CloudyNight.png";
                } else if (firstTwoChar == "04"){
                    iconSource = "../assets/img/DarkCloud.png";
                } else if (firstTwoChar == "09"){
                    iconSource = "../assets/img/RainCloud.png";
                } else if (firstTwoChar == "10"){
                    iconSource = "../assets/img/NightRain.png";
                } else if (firstTwoChar == "11"){
                    iconSource = "../assets/img/Thunderstorm.png";
                } else if (firstTwoChar == "13"){
                    iconSource = "../assets/img/Snow.png";
                } else if (firstTwoChar == "50"){
                    iconSource = "../assets/img/Wind.png";
                }
            }

            let i = data.wind.deg;
            windDirection = getWindDirection(i);
            console.log(windDirection);

            const weatherOutput = `
            <h3>${city}</h3>
            <h4>${day} ${monthName}, ${year}</h4>
            <img class="big-img" src=${iconSource}>
            <h1>${celsius}°</h1>
            <h4>${cloudiness}</h4>
            <article>
            <div class="icon-wrapper">
            <img class="icon" src="../assets/img/windsock.png">
            <p>${windDirection}</p>
            </div>
            <div class="icon-wrapper">
            <img class="icon" src="../assets/img/Wind.png">
            <p>${windSpeed}m/s</p>
            </div>
            <div class="icon-wrapper">
            <img class="icon" src="../assets/img/Clouds.png">
            <p>${humidity}%</p>
            </div>
            </article>
            <div class="more-info">
            <p>Sunrise: ${sunriseTime}</p>
            <p>Sunset: ${sunsetTime}</p>
            <p>Pressure: ${pressure} hPa</p>
            <p>Geo Coords: [${lat}, ${lon}]</p>
            </div>`;

            section.insertAdjacentHTML("beforeend", weatherOutput);
            section.classList.add("weather-sec");

        })
        .catch((err) => console.log(`Fehler: ${err}`))
        
    })
    .catch((err) => console.log(`Fehler: ${err}`));

}

const changeCity = () => {
    inputWrapper.style.top = "5rem";
    figure.style.bottom = "-100rem";
}
