const first = document.querySelector(".first")
const third = document.querySelector(".third")
const second = document.querySelector(".second")
const menu = document.querySelector(".menu")

let isOpen = false;



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
isOpen = !isOpen;
})