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

const navbar = document.querySelector(".navbar")
menu.addEventListener("click",()=>{

    navbar.classList.toggle("active")

})

const pregressbar = document.querySelector("#progress-bar")



// horizental scroll bar
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercent = (scrollTop / scrollHeight) * 100;

    pregressbar.style.width = scrollPercent + "%";
});
