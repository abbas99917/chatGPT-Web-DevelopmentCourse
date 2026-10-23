    let btn = document.querySelector("#menu-btn")
    const navMenu = document.getElementById("nav-menu");
    
    btn.addEventListener("click",()=>{
        navMenu.classList.toggle("active")
    })

    navMenu.addEventListener("click",()=>{
        navMenu.classList.remove("active")
    })