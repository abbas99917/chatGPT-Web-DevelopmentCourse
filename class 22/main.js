let first = document.querySelector(".first")
let second = document.querySelector(".second")
let third = document.querySelector(".third")


let menu = document.querySelector(".menu")


let isOpen = false
menu.addEventListener("click",()=>{
    second.style.display = "none"

   if(isOpen === false){
    first.style.transform = "translateY(8px) rotate(45deg)"
    third.style.transform  = "translateY(-8px) rotate(-45deg)"
   }else if(isOpen === true){
    first.style.transform = "none"
    third.style.transform = "none"
    second.style.display = "block"
   }
   isOpen = !isOpen
})


const navbar = document.querySelector(".navbar")
menu.addEventListener("click",()=>{

    navbar.classList.toggle("active")

})  