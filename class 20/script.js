    let btn = document.querySelector("#menu-btn")
    const navMenu = document.getElementById("nav-menu");
    
    btn.addEventListener("click",()=>{
        navMenu.classList.toggle("active")
        if(navMenu.classList.contains("active")){
              btn.textContent = "✕"
        }else{
            btn.textContent = "☰"
        }
    })

  