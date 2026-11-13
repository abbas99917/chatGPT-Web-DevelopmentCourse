let loadStoreProducts = JSON.parse(localStorage.getItem("newCarts")) || [];

const showCount = () =>{
    const count  = document.querySelector(".cartCount")
    const itemCount = document.querySelector(".total-items")
    const totalCount = document.querySelector(".total-count")


    itemCount.innerText = `Item ${loadStoreProducts.length}`;
    count.innerText = loadStoreProducts.length;
    totalCount.innerText = loadStoreProducts.length;
}
showCount()

const cartBox = document.querySelector(".cart-box")
const renderStoreProducts = (products = loadStoreProducts) =>{

cartBox.innerHTML = ""

products.forEach((item)=>{

    const element = document.createElement("div")
    element.classList.add("cart-item")
    element.innerHTML = ` 
  

        <div class="cart-image">
            <img src="${item.image}" alt="Product">
        </div>

        <div class="cart-details">
            <h3 class="product-name">${item.name}</h3>

            <div class="price-box">
                <span class="current-price">Rs ${item.price * item.quantity}</span>
                <span class="actual-price">Rs ${item.actualPrice}</span>
            </div>
        </div>

        <div class="cart-actions">

            <div class="quantity-box">
                <button class="decrement"  data-id="${item.id}">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increment"   data-id="${item.id}">+</button>
            </div>

            <button class="remove-btn" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i>
                Remove
            </button>

        </div>

    `

    cartBox.appendChild(element)
})
}
renderStoreProducts()






// increament logics
cartBox.addEventListener("click",(e)=>{

let findEle = e.target.closest(".increment")

if(!findEle)return

let findID = Number(findEle.dataset.id)

let search = loadStoreProducts.find((item)=>{
    return item.id === findID
})
if(search){
    search.quantity += 1
    localStorage.setItem("newCarts",JSON.stringify(loadStoreProducts))
    renderStoreProducts()
    grandCalculations()
    showCount()
}
})


// decreament
cartBox.addEventListener("click",(e)=>{
    let findEle = e.target.closest(".decrement")
    if(!findEle)return

let findID = Number(findEle.dataset.id)

let search = loadStoreProducts.find((item)=>{
    return item.id === findID
})
if(search.quantity > 1){
    search.quantity -= 1
    localStorage.setItem("newCarts",JSON.stringify(loadStoreProducts))
    renderStoreProducts()
    grandCalculations()
    showCount()
}
})

// remove items

cartBox.addEventListener("click",(e)=>{

    let findbtn = e.target.closest(".remove-btn")
if(!findbtn)return

let findID = Number(findbtn.dataset.id)

loadStoreProducts = loadStoreProducts.filter((item)=>{
    return item.id !==findID
})
renderStoreProducts()
grandCalculations()
localStorage.setItem("newCarts",JSON.stringify(loadStoreProducts))
showCount()
    
})

// grandtotral

const wholePrice = document.querySelector(".subtotal")
const shipping = document.querySelector(".shipping")
const grandTotal = document.querySelector(".grand-total")

    const grandCalculations = () =>{

        let subtotal = loadStoreProducts.reduce((total,item)=>{
            return total + (item.price * item.quantity)
        },0)
        let delivery = loadStoreProducts.length === 0 ? 0 : 200;
        wholePrice.innerText = `Rs ${subtotal}`;
        shipping.innerText = `Rs ${delivery}`
        grandTotal.innerText = `Rs ${subtotal + delivery}`


    }
    grandCalculations()


    // search products logics

    const searchProducts = document.querySelector("#searchProduct")

    searchProducts.addEventListener("input",()=>{
        let userValue = searchProducts.value.trim().toLowerCase()

        let loadproduct = loadStoreProducts.filter((item)=>{
            return item.name.toLowerCase().includes(userValue)
        })
        renderStoreProducts(loadproduct)
    })