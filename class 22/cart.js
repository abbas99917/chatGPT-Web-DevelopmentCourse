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
    <div class="quantity-box">
        <button class="decreament" data-id="${item.id}" onclick="decreament(this.dataset.id)">-</button>
        <p class="quantity-increament">${item.quantity}</p>
        <button class="increament" data-id="${item.id}" onclick="increament(this.dataset.id)">+</button>
    </div>
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
}


const decreament = (id) => {
    const updatedArray = cartItems.find((cur) => {
        return cur.id === Number(id);
    });

    if (updatedArray && updatedArray.quantity > 1) {
        updatedArray.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayAddedCart();
    }
};

