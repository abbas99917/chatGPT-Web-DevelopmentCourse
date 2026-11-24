const apiKey = "d7eea3165a7d7b140925fc4ff91025f3"


const fetchApi = async ()  =>{
    const url = `https://api.themoviedb.org/3/search/movie?query=Inception&api_key=${apiKey}`;


    try {
        let response = await fetch(url)
        let data  = await response.json()
        console.log(data)
    } catch (error) {
        console.log("error")
    }
}
fetchApi()