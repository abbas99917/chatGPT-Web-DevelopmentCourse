// toggle them
const toggle = document.querySelector(".theme-btn")
const body = document.querySelector("body")
toggle.addEventListener("click",()=>{
    body.classList.toggle("dark-mode")
 
})