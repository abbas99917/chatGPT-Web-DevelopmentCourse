// cartITEM============================ 




let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


const container = document.querySelector(".cartitems")

const displayAddedCart = () =>{

container.innerHTML = ""

cartItems.forEach((item)=>{
    const cart = document.createElement("div")
    
    cart.innerHTML = `
     <div class="cart-one ">
        <div class="image"><img src="${item.image}" alt=""></div>

        <!--  -->
        <h3>${item.name}</h3>
            <p class="price">Price $${item.price}</p>
    <p class="quantity">Quantity ${item.quantity}</p>
    <spane>${item.price * item.quantity}</spane>
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

const increamentDecreament = document.querySelector(".quantity-increament")

const increament = (id) =>{
const updatedArray = cartItems.find((cur)=>{
return cur.id === Number(id);
})
updatedArray.quantity+=1;

localStorage.setItem("cartItems", JSON.stringify(cartItems));

displayAddedCart()
updateCartCount();
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

}



// subtotal ============= 

const calculateSubtotal = () => {
    // Yahan subtotal calculate karna hai
};  