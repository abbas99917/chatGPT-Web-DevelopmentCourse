// mobile menu open

const menu = document.querySelector(".menu")
const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")


let state = false
menu.addEventListener("click", ()=>{
    second.style.display = "none"


    if(state === false){
         first.style.transform = `translateY(8px) rotate(45deg)`
         third.style.transform = `translateY(-8px) rotate(-45deg)`
    }else{
        first.style.transform = "none"
        third.style.transform = "none"
        second.style.display = "flex"
    }
    
    
    state = !state;
})

const navbar = document.querySelector(".navbar")

menu.addEventListener("click",()=>{

 navbar.classList.toggle("active")
    
})