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

    document.addEventListener("keydown",(event)=>{
            if(event.key === "Escape"){
                navMenu.classList.remove("active")
               btn.textContent = "☰" 
            }
    })
  
    document.addEventListener("click",(event)=>{
        console.log(event.target)
        if(!navMenu.contains(event.target) && !btn.contains(event.target)){
            navMenu.classList.remove("active")
              btn.textContent = "☰"
        }

    })
    
    const backtoTop = document.querySelector("#back-to-top")
    backtoTop.addEventListener("click",()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })