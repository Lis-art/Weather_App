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
  


const apiKey = "2732b54b60c08dad4aa20e1b6fc1aacc";

const section = document.querySelector("section");


const showWeather = () => {
    
    section.innerHTML = "";
    
    const cityInput = document.querySelector("#cityInput").value;
    console.log(cityInput);
    

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let lat = data[0].lat;
        let lon = data[0].lon;
        console.log({lat}, {lon});

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((res) => res.json())
        .then((data) => {console.log(data)
            
            const city = data.name;
            const temperature = data.main.temp;
            const celcius = Math.round(temperature - 273.15);
            const timeZone = data.timezone;
            const windDeg = data.wind.deg;
            const windSpeed = data.wind.speed;
            const cloudiness = data.weather[0].description;
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const geoCords = data.coord;
            const date = new Date();
            const day = date.getDay();
            const month = date.getMonth();
            const year = date.getFullYear();
            const monthName = monate[month];

            const sunrise = data.sys.sunrise;
            let sunriseTime = new Date((sunrise + timeZone)* 1000).toUTCString();
            sunriseTime = sunriseTime.slice(-12, -7);
            
            const sunset = data.sys.sunset;
            let sunsetTime = new Date((sunset + timeZone)* 1000).toUTCString();
            sunsetTime = sunsetTime.slice(-12, -7);

            lat = lat.toFixed(2);
            lon = lon.toFixed(2);


            // 
            const icon = data.weather[0].icon;
            const firstTwoChar = icon.slice(0, 2);
            const lastChar = icon.slice(2);
                
                if (lastChar == "d"){
                    if(firstTwoChar == 01){
                        iconSource = "./assets/img/Sun.png"
                    } else if (firstTwoChar == 02){
                        iconSource = "./assets/img/CloudySun.png"
                    } else if (firstTwoChar == 03){
                        iconSource = "./assets/img/Cloud.png"
                    } else if (firstTwoChar == 04){
                        iconSource = "./assets/img/DarkCloud.png"
                    } else if (firstTwoChar == 09){
                        iconSource = "./assets/img/RainCloud.png"
                    } else if (firstTwoChar == 10){
                        iconSource = "./assets/img/SunRain.png"
                    } else if (firstTwoChar == 11){
                        iconSource = "./assets/img/Thunderstorm.png"
                    } else if (firstTwoChar == 13){
                        iconSource = "./assets/img/Snow.png"
                    } else if(firstTwoChar == 50){
                        iconSource = "./assets/img/Wind.png"
                    }
                } else if (lastChar == "n"){
                    if(firstTwoChar == 01){
                        iconSource = "./assets/img/ClearNight.png"
                    } else if (firstTwoChar == 02){
                        iconSource = "./assets/img/CloudyNight.png"
                    } else if (firstTwoChar == 03){
                        iconSource = "./assets/img/CloudyNight.png"
                    } else if (firstTwoChar == 04){
                        iconSource = "./assets/img/DarkCloud.png"
                    } else if (firstTwoChar == 09){
                        iconSource = "./assets/img/RainCloud.png"
                    } else if (firstTwoChar == 10){
                        iconSource = "./assets/img/NightRain.png"
                    } else if (firstTwoChar == 11){
                        iconSource = "./assets/img/Thunderstorm.png"
                    } else if (firstTwoChar == 13){
                        iconSource = "./assets/img/Snow.png"
                    } else if(firstTwoChar == 50){
                        iconSource = "./assets/img/Wind.png"
                    }
                }
                console.log({city}, {temperature}, {celcius}, {timeZone}, {windDeg}, {windSpeed}, {cloudiness}, {pressure}, {humidity}, {sunriseTime}, {sunsetTime}, {geoCords}, {day}, {monthName}, {year});
            
                let weatherOutput = 
                `<h3>${city}</h3>
                <p>${day} ${monthName}, ${year}</p>
                <img class="big-img" src=${iconSource} alt="wind">
                <h1>${celcius}°C</h1>
                <p>${cloudiness}</p>
                <article><div><img class="icon" src="./assets/img/Wind.png" alt="wind"><p>${windSpeed}m/s</p></div>
                <div><img class="icon" src="./assets/img/Clouds.png" alt="clouds"><p>${humidity}%</p></div></article>
                <p>Sunrise: ${sunriseTime}</p>
                <p>Sunset: ${sunsetTime}</p>
                <p>Pressure: ${pressure} hPa</p>
                <p>Geocoords: [${lat}, ${lon}]</p>`;
                section.insertAdjacentHTML("beforeend", weatherOutput);
                section.classList.add("weather-sec");
                
        })
        .catch((err) => console.log(`Fehler: ${err}`));
    })
    .catch((err) => console.log(`Fehler: ${err}`));
}

const changeCity = () => {
    input.wrapper.style.top = "0";

    section.innerHTML = "";

    section.classList.remove()
}
