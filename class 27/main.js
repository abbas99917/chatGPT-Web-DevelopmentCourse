//
const menu = document.querySelector(".menu")
const first = document.querySelector(".first")
const second  = document.querySelector(".second")
const third = document.querySelector(".third")


let navbar = document.querySelector(".navbar")
let isOpen = false;

menu.addEventListener("click",()=>{

    if(isOpen === false){
        navbar.classList.add("active")
        first.style.transform = `translateY(8px) rotate(45deg)`
        second.style.display = "none"
        third.style.transform = `translateY(-8px) rotate(-45deg)`
    }else{
        navbar.classList.remove("active")
         first.style.transform = "none"
        second.style.display = "flex"
        third.style.transform = "none"
    }
    isOpen = !isOpen


})
