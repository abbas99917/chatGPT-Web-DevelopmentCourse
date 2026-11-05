// cart.js file

 let getDataFromLocal = JSON.parse(localStorage.getItem("addedCart")) || [];

 // showcount
 const showCount = () =>{
    const count = document.querySelector(".count")
    let totalCart = getDataFromLocal.length;
   count.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>${totalCart}`
 }
 showCount()
 
const addedCart = document.querySelector(".added-cart")
 
const displayAddedCart = () =>{
    addedCart.innerHTML = ""

    getDataFromLocal.forEach((item)=>{
        const cart = document.createElement("div")
        cart.innerHTML = `<div class="cart-one">
    <div class="image"><img src="${item.image}" alt="" width="100px"></div>
    <p class="name">${item.name}</p>
    <p class="price">$${item.price * item.quantity}</p>
    <div class="incdecbtn">
        <button onclick="decreament(${item.id})">-</button>
        <p class="countView">${item.quantity}</p>
        <button onclick="increament(${item.id})">+</button>
    </div>
    <button class="dlt"  onclick="removeProduct(${item.id})">Remove Cart</button>
</div>`


addedCart.append(cart)
    })

}

displayAddedCart()




// increament logic
const increament = (id) =>{

    let product = getDataFromLocal.find((item)=>{
        return  item.id === id
    })

    if(product){
      product.quantity+= 1;
  
        localStorage.setItem("addedCart",JSON.stringify(getDataFromLocal))
    }
displayAddedCart()
calculateTotalPrice()
}


// decreament logic
const decreament = (id) =>{

    let product = getDataFromLocal.find((item)=>{
        return item.id === id
    })
    if( product && product.quantity > 1){
        product.quantity--
        localStorage.setItem("addedCart",JSON.stringify(getDataFromLocal))

    }
    displayAddedCart()
    calculateTotalPrice()

}



// remove button logic
const removeProduct = (id) =>{

    let result = getDataFromLocal.filter((item)=>{
        return item.id !==id
    })
    getDataFromLocal = result
    localStorage.setItem("addedCart",JSON.stringify(result))
    displayAddedCart()
    calculateTotalPrice()
    showCount()
    
}



const fnprice = document.querySelector(".fnprice")
const quanty = document.querySelector(".quanty")
const finalPrice = document.querySelector(".finalPrice")



const calculateTotalPrice = () =>{
  let totalPrice =    getDataFromLocal.reduce((total,item)=>{
        return total + (item.price * item.quantity)
        
    },0)
let totalQuantity = getDataFromLocal.reduce((total,item)=>{
    return total + item.quantity
},0)


let totalPrices = getDataFromLocal.reduce((total,item)=>{
    return total + (item.price * item.quantity)
},0)
fnprice.innerText= totalPrices
quanty.innerText = totalQuantity
finalPrice.innerText = `$${totalPrice}`


 
}
calculateTotalPrice()