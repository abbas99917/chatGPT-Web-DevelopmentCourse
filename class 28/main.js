const movieConainer = document.querySelector(".movies-container")
const search = document.querySelector("#searchInput")
const searchBtn = document.querySelector("#searchBtn")
const movieModal = document.querySelector("#movieModal");
const movieDetailContent = document.querySelector("#movieDetailContent");
const closeModal = document.querySelector("#closeModal")
const favoritMovie = document.querySelector(".favorit-movie");








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
                    <button class="details-btn" data-id="${item.id}">View Details</button>
                </div>
                `

                movieConainer.appendChild(box)
            })
}
const fetchApi = async (movieName)  =>{
    movieConainer.innerHTML = "Loading movies...";
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`;


    try {
        let response = await fetch(url)
        let data  = await response.json()
        let result = data.results
        console.log(result)

         // filter null poster
    
            filteredMovies = result.filter((item) => {
                 return item.poster_path !== null && item.title !== "undefined"; // jis poster ki path agr null hogi to wo nhi dikhaiga
        });
            renderMovei(filteredMovies)

            if(filteredMovies.length === 0){
                movieConainer.innerHTML = "No Movies Found!"
            }

    } catch (error) {
       movieConainer.innerHTML = "Something went wrong. Please try again.";
    }
         
}
fetchApi()



let searchTimer;


search.addEventListener("input",()=>{

    let userValue = search.value.trim().toLowerCase()
    clearTimeout(searchTimer);

    searchTimer = setTimeout(()=>{

        // default movie
        if(userValue === ""){
            fetchApi("inception")
            return
        }

        fetchApi(userValue)
    },500)


})
let existing = null;
movieConainer.addEventListener("click",(e)=>{
    let find = e.target.closest(".details-btn")
    if(!find)return
  let findID = Number(find.dataset.id)

existing =   filteredMovies.find((item)=>{
    return item.id === findID
  })

  if(existing){
    movieDetailContent.innerHTML = `<h2>${existing.title !== "Undefined" ? existing.title : existing.original_title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${existing.poster_path}" alt="${existing.title}">
    <p>${existing.overview}</p>
    <p>${existing.release_date}</p>
    <p>${existing.vote_average}</p>
    <button class="favorite-btn">
    ❤️ Add to Favorites
</button>


`
let favoriteBtn = movieDetailContent.querySelector(".favorite-btn");
let alreadyFavorite = favorite.some((item) => {
    return item.id === existing.id;
});
if(alreadyFavorite){
    favoriteBtn.innerHTML = "❤️ Added to Favorites";
}else{
    favoriteBtn.innerHTML = "❤️ Add to Favorites";
    
}

  }
  movieModal.classList.add("active")

})

closeModal.addEventListener("click",()=>{
    movieModal.classList.remove("active")
})

movieModal.addEventListener("click",(e)=>{
 if (e.target === movieModal) {
    movieModal.classList.remove("active");
}
})

// add to favorite button
let favorite = JSON.parse(localStorage.getItem("favoritMovie")) || []
movieDetailContent.addEventListener("click", (e) => {
    let favoriteBtn = e.target.closest(".favorite-btn");

    if (!favoriteBtn) return;

    
    let alreadyFavorite = favorite.some((item) => {
    return item.id === existing.id;
});
if(alreadyFavorite){
}else{
    favoriteBtn.innerHTML = "❤️ Add to Favorites";
}
if(!alreadyFavorite){
    favorite.push(existing)
    localStorage.setItem("favoritMovie",JSON.stringify(favorite))
    favoriteBtn.innerHTML = "❤️ Added to Favorites";
    console.log(favorite)
}
renderFavorite()
});

// render favorite movie

const renderFavorite = () =>{
    favoritMovie.innerHTML = ''
if(favorite.length === 0){
    favoritMovie.innerHTML = `<p>"You haven't added any favorite movies yet!"</p`
}
    favorite.forEach((item)=>{

       const cart = document.createElement("div")

        cart.innerHTML += `
            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="">
                <p>${item.title}</p>
                <p>${item.overview}</p>
                <p>Release: ${item.release_date}</p>
                <p>Rating: ${item.vote_average}</p>
                    <button class="favorite-btn" data-id="${item.id}">❤️ Remove From Favorites </button>
                
                `
        
                favoritMovie.appendChild(cart)
        })
}
renderFavorite()

favoritMovie.addEventListener("click",(e)=>{

    let find = e.target.closest(".favorite-btn")

    if(!find)return 

    let findID = Number(find.dataset.id)

     favorite  = favorite.filter((item)=>{
        return item.id !== findID
    })
    renderFavorite()
    localStorage.setItem("favoritMovie",JSON.stringify(favorite))
    
})