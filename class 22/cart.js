// cartITEM============================ 




let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


const container = document.querySelector(".cartitems")

const displayAddedCart = () =>{

container.innerHTML = ""

if (cartItems.length === 0) {
    container.innerHTML = `
        <div class="empty-state">
        <h2>Your Cart is Empty</h2>
        <button class="continue-shopping">Continue Shopping</button>
        </div>
    `;

    const homeBtn = container.querySelector(".continue-shopping");

    homeBtn.addEventListener("click", () => {
        window.location.href = "./index.html";
    });

    return;
}

cartItems.forEach((item)=>{
    const cart = document.createElement("div")
    
    cart.innerHTML = `
     <div class="cart-one ">
        <div class="image"><img src="${item.image}" alt=""></div>

        <!--  -->
        <h3>${item.name}</h3>
            <p class="price">Price $${item.price}</p>
    <p class="quantity">Quantity ${item.quantity}</p>
    <span>$${item.price * item.quantity}</span>
    <div class="quantity-box">
        <button class="decreament" data-id="${item.id}" onclick="decreament(this.dataset.id)">-</button>
        <p class="quantity-increament">${item.quantity}</p>
        <button class="increament" data-id="${item.id}" onclick="increament(this.dataset.id)">+</button>
        </div>
        <button onclick="deletebtn(${item.id})" class="delete">Delete</button>
    </div>`

    container.appendChild(cart)
})


}
displayAddedCart()


const increament = (id) =>{
const updatedArray = cartItems.find((cur)=>{
return cur.id === Number(id);
})
updatedArray.quantity+=1;

localStorage.setItem("cartItems", JSON.stringify(cartItems));

displayAddedCart()
updateCartCount();
calculateSubtotal();
updateTotalQuantity()
}


const decreament = (id) => {
    const updatedArray = cartItems.find((cur) => {
        return cur.id === Number(id);
    });

    if (updatedArray && updatedArray.quantity > 1) {
        updatedArray.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayAddedCart();
        updateCartCount();
        calculateSubtotal();
        updateTotalQuantity()
    }
};

// 


const updateCartCount = () =>{
    const cartCount = cartItems.reduce((total,item)=>{
        return total + item.quantity;
    },0)
    document.querySelector(".circle").innerHTML =  `<i class="fa-solid fa-cart-shopping"></i> ${cartCount}`;
}
updateCartCount()


const deletebtn = (id) =>{
cartItems = cartItems.filter((cur)=>{
    return cur.id !== Number(id)
})
 localStorage.setItem("cartItems", JSON.stringify(cartItems))
 displayAddedCart()
 updateCartCount();
 calculateSubtotal()
 updateTotalQuantity()

}



// subtotal ============= 

const price = document.querySelector(".total")
const pay = document.querySelector(".pay")

let subTotal = 0;
const calculateSubtotal = () => {
    subTotal = cartItems.reduce((total,item)=>{
  return total + (item.price * item.quantity);
    },0)
       
    let DeliveryCharges = 20;
    if(cartItems.length === 0 ){
        DeliveryCharges = 0;
    }else{
        DeliveryCharges = 20;
    }
 
    price.innerHTML = `$${subTotal}`;
    pay.innerHTML = `$${subTotal + DeliveryCharges}`;
     updateCartCount();


    
};  
calculateSubtotal()

// quantity

const updateTotalQuantity = () => {
    const quantityElement = document.querySelector(".total-quantity");

    const totalQuantity = cartItems.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    quantityElement.innerText = totalQuantity;
};

updateTotalQuantity()


// toast

const showPopup = () =>{
    const toast =document.querySelector(".toast")
    setTimeout(()=>{
        toast.classList.add("show")
    },1000) 
    setTimeout(()=>{
    toast.classList.remove("show")
},3000)

}

