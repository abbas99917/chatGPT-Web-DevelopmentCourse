// nfavbar code 

const menu = document.querySelector(".menu")
const navbar = document.querySelector(".navbar")
//======================
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


let loadCarts = JSON.parse(localStorage.getItem("shoppingCarts")) || []

// cart count

const showCount = () =>{
    let count = document.querySelector(".count")
    count.innerText = loadCarts.length;
}
showCount()

console.log(loadCarts)

const parentDiv = document.querySelector(".cart-parent")
const renderCarts = () =>{

parentDiv.innerHTML = ""

loadCarts.forEach((item)=>{

    const creatCart = document.createElement("div")

    creatCart.innerHTML = `
      <div class="cart-child">
                <img src="${item.image}" width="200px" alt="">
                <p class="pName">${item.name}</p>
                <p class="price">${(item.price * item.quantity).toFixed(2)}</p>
                <p class="quantity">${item.quantity}</p>
                <div class="btns">
                    <button class="decreament" data-id="${item.id}">-</button>
                    <p class="quantityCount">${item.quantity}</p>
                    <button class="increament" data-id="${item.id}">+</button>
                </div>
                <button class="removeBtn" data-id="${item.id}">Remove Cart</button>
            </div>`

            parentDiv.appendChild(creatCart)


})

}
renderCarts()