const menu = document.querySelector(".menu")

const navbar = document.querySelector(".navbar")

const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")

let isOpen = false

menu.addEventListener("click",(e)=>{

    if(isOpen === false){
        navbar.classList.add("active")
        first.style.transform = "translateY(8px) rotate(45deg)"
        second.style.display = "none"
        third.style.transform = "translateY(-8px) rotate(-45deg)"
    }else{
        navbar.classList.remove("active")
        first.style.transform = "none"
        second.style.display = "block"
        third.style.transform = "none"
    }

    isOpen = !isOpen
})