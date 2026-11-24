const movieConainer = document.querySelector(".movies-container")
const search = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#searchBtn")

const apiKey = "d7eea3165a7d7b140925fc4ff91025f3"

let filteredMovies = [];
const renderMovei = (movies) =>{
         movieConainer.innerHTML = ""

            movies.forEach((item)=>{
                const box = document.createElement("div")
                box.classList.add("movie-card")

                box.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}">
                <div class="movie-info">
                    <h3>${item.title}</h3>
                    <div class="movie-meta">
                        <span>${item.release_date}</span>
                        <span>⭐ ${item.vote_average.toFixed(1)}</span>
                    </div>
                    <button class="details-btn">View Details</button>
                </div>
                `

                movieConainer.appendChild(box)
            })
}
const fetchApi = async (movieName)  =>{
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;


    try {
        let response = await fetch(url)
        let data  = await response.json()
        let result = data.results
        console.log(result)

         // filter null poster
    
            filteredMovies = result.filter((item) => {
                 return item.poster_path !== null; // jis poster ki path agr null hogi to wo nhi dikhaiga
        });
            renderMovei(filteredMovies)

    } catch (error) {
        console.log("error")
    }
         
}
fetchApi()


search.addEventListener("input",()=>{

    let userValue = search.value.trim().toLowerCase()

fetchApi(userValue)

})

