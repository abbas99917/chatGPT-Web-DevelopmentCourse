    const cityInput = document.querySelector("#city-input")
    const searchBtn = document.querySelector(".search-btn")



    searchBtn.addEventListener("click",()=>{

        if(cityInput.value.trim()=== ""){
            return
        }
        let cityName = cityInput.value;


        getApi(cityName)
        cityInput.value = ""
    })

    const namesearch = document.querySelector(".city-name")
    const temp = document.querySelector(".temperature")
    const dateTime = document.querySelector(".date-time")
    const condition  = document.querySelector(".weather-condition")
    const speed = document.querySelector(".wind-speed")
    const humidity = document.querySelector(".humidity")
    const pressure = document.querySelector(".pressure")

    const invalidCity = document.querySelector(".error-message")
    const getApi = async ( cityName ) =>{

        
        const apiKey = "ed58d3d627564d72a3e100715260911"
    const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`

        try{
            const response = await  fetch(apiURL)
            const data = await  response.json()


            if (response.ok) {
                namesearch.innerText = data.location.name;
                temp.innerText = `${data.current.temp_c} °C`;
                dateTime.innerText = data.current.last_updated;
                condition.innerText = data.current.condition.text;
                speed.innerText = `${data.current.wind_kph} km/h`;
                humidity.innerText = `${data.current.humidity} %`;
                pressure.innerText = `${data.current.pressure_mb} hPa`;

            cityInput.value = ""
            invalidCity.innerText = "";

               
    } else {
                cityInput.value = ""
                namesearch.innerText = "--"
                temp.innerText = "--"
                dateTime.innerText = "--"
                condition.innerText = "--"
                speed.innerText =  "--"
                humidity.innerText =  "--"
                pressure.innerText =  "--"
                invalidCity.innerText = "Invalid Country/City Name"
    }
    


        
        }catch{
            console.log("error")
        }

    }

