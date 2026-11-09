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

const namesearch = document.querySelector(".cityName")
const temp = document.querySelector(".temperature")
const getApi = async ( cityName ) =>{

    
    const apiKey = "ed58d3d627564d72a3e100715260911"
   const apiURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`

    try{
        const response = await  fetch(apiURL)
        const data = await  response.json()

      if (response.ok) {
    console.log(data)
} else {
    console.log(data.error.message)
}

     
    }catch{
        console.log("error")
    }

}

