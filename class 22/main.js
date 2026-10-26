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

const images = [
    {
        image: "images/01.png"
    },
    {
        image: "images/02.png"
    },
    {
        image: "images/03.png"

    },
    {
        image: "images/hero-image.png"
    }
]
let arrIndex = 0;
let heroImage = document.querySelector(".hero-image");

setInterval(() => {
    heroImage.src = images[arrIndex].image;

    arrIndex++;

    if (arrIndex >= images.length) {
        arrIndex = 0;
    }
}, 3000);