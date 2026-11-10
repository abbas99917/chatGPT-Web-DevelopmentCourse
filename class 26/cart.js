// cart.js fies

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
                <button class="increament"  data-id="${item.id}">+</button>
                <p class="quantityCount">${item.quantity}</p>
                <button class="decreament" data-id="${item.id}">-</button>
                </div>
                <button class="removeBtn" data-id="${item.id}" onclick="removeItem(${item.id})">Remove Cart</button>
            </div>`

            parentDiv.appendChild(creatCart)


})

}
renderCarts()




// increament dereament logics

parentDiv.addEventListener("click",(e)=>{

    let findID = e.target.closest(".increament")

    if(!findID) return

    let id = Number(findID.dataset.id)
    if(!id) return
   
    let findCart = loadCarts.find((item)=>{
        return item.id === id
    })
    if(findCart){
        findCart.quantity += 1
    }
localStorage.setItem("shoppingCarts", JSON.stringify(loadCarts))
renderCarts()
finalSummery()

})

// decreament logis

parentDiv.addEventListener("click",(e)=>{
    let findID = e.target.closest(".decreament")

    if(!findID) return

    let id = Number(findID.dataset.id)
    if(!id) return

    let findCart = loadCarts.find((item)=>{
        return item.id === id
    })
    if(findCart.quantity > 1){
        findCart.quantity -= 1 
    }
    localStorage.setItem("shoppingCarts",JSON.stringify(loadCarts))
    renderCarts()
    finalSummery()

    
})


// remove carts

const removeItem = (id) =>{



let removeCart = loadCarts.filter((item)=>{
    return item.id !== id
})
loadCarts = removeCart
localStorage.setItem("shoppingCarts",JSON.stringify(loadCarts))
renderCarts()
showCount()
finalSummery()
}


// summery
const totalItems = document.querySelector(".total-items")
const subtotal = document.querySelector(".subtotal")
const shipping = document.querySelector(".shipping")
const grandTotal = document.querySelector(".grand-total")

// let delivery = 200;

const finalSummery = () =>{
    totalItems.innerText = loadCarts.length;
    let subTotalPrice = loadCarts.reduce((total,item)=>{
        return total + (item.price * item.quantity)
    },0)
    
    let delivery = loadCarts.length === 0 ? 0 : 200;
    shipping.innerText = `Rs.${delivery}`
    subtotal.innerText  = `Rs ${subTotalPrice.toFixed()}`
    grandTotal.innerText = `Rs${subTotalPrice + delivery}`
    


}

finalSummery()

console.log("Cart JS loaded");

console.log("Button:", document.querySelector(".checkout-btn"));

console.log("Toast:", document.querySelector(".toast"));

console.log("Cart data:", loadCarts);

// taosat notifications

const btn = document.querySelector(".checkout-btn")
const toast = document.querySelector(".toast")
btn.addEventListener("click",()=>{

    //     toast.style.display = "flex";
    // console.log("Toast display:", toast.style.display);

    if(loadCarts.length === 0){
        alert("Your Cart is Empty")
        return
    }

    setTimeout(()=>{
        toast.style.display = "flex"
    },1000)
 
    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);

})