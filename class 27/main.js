//
const menu = document.querySelector(".menu")
const first = document.querySelector(".first")
const second  = document.querySelector(".second")
const third = document.querySelector(".third")


let navbar = document.querySelector(".navbar")
let isOpen = false;

menu.addEventListener("click",()=>{

    if(isOpen === false){
        navbar.classList.add("active")
        first.style.transform = `translateY(8px) rotate(45deg)`
        second.style.display = "none"
        third.style.transform = `translateY(-8px) rotate(-45deg)`
    }else{
        navbar.classList.remove("active")
         first.style.transform = "none"
        second.style.display = "flex"
        third.style.transform = "none"
    }
    isOpen = !isOpen


})


// products-array


const products = [
    {
        id: 1,
        name: "Smart Watch Pro",
        image: "productsImages/smartwatch.jfif",
        rating: 4.5,
        reviews: 129,
        price: 12999,
        actualPrice: 19999
    },
    {
        id: 2,
        name: "Wireless Headphones",
        image: "productsImages/headphone.jfif",
        rating: 4.8,
        reviews: 96,
        price: 8999,
        actualPrice: 12999
    },
    {
        id: 3,
        name: "Leather Backpack",
        image: "productsImages/bag.jfif",
        rating: 4.6,
        reviews: 74,
        price: 5999,
        actualPrice: 8999
    },
    {
        id: 4,
        name: "Running Shoes",
        image: "./productsImages/shoes.jfif",
        rating: 4.7,
        reviews: 63,
        price: 6699,
        actualPrice: 11999
    },
    {
        id: 5,
        name: "Smartphone 128GB",
        image: "./productsImages/phone.jfif",
        rating: 4.5,
        reviews: 172,
        price: 69999,
        actualPrice: 89999
    },
    {
        id: 6,
        name: "Classic Cotton T-Shirt",
        image: "./productsImages/cotton.jfif",
        rating: 4.6,
        reviews: 85,
        price: 2999,
        actualPrice: 4999
    }
];


// dynamic product rendering

const productContainer = document.querySelector(".products-container")
const renderProducts = () =>{
productContainer.innerHTML = ""

products.forEach((item)=>{
    const cart = document.createElement("div")

    cart.innerHTML = `<div class="product-card">

   
    <div class="product-image">
        <img src="${item.image}" alt="Smart Watch">
    </div>

    <!-- Wishlist -->
    <i class="fa-regular fa-heart wishlist"></i>

  
    <div class="product-details">
        <h3 class="product-name">${item.name}</h3>
        <div class="rating">
            <i class="fa-solid fa-star"></i>
            <span>${item.rating}</span>
            <small>(129 Reviews)</small>
        </div>

       
        <div class="price">
            Rs. ${item.price}
            <del>Rs. ${item.actualPrice}</del>
        </div>

        <button class="add-to-cart"  data-id="${item.id}">
            <i class="fa-solid fa-cart-shopping"></i>
            Add to Cart
        </button>
    </div>
</div>`

productContainer.appendChild(cart)
})

}
renderProducts()




let cartArray = JSON.parse(localStorage.getItem("newCarts")) || []

const showCount = () =>{
    const cartCount = document.querySelector(".cartCount")
    cartCount.innerText  = cartArray.length;
}
showCount()


productContainer.addEventListener("click",(e)=>{

    let btn = e.target.closest(".add-to-cart")

    if(!btn)return
    let btnID = Number(btn.dataset.id)
   
    if(!btnID)return


    let findCart = products.find((item)=>{
        return item.id === btnID
    })

   
    console.log(cartArray)

    // dublicate checked

    let existingProduct = cartArray.find((item)=>{
        return item.id === btnID
    })
    if(existingProduct){
        existingProduct.quantity += 1
    }else{
        let newProduct = {
            ...findCart,
            quantity: 1
        }
        cartArray.push(newProduct)
    }

    localStorage.setItem("newCarts",JSON.stringify(cartArray))
    showCount()
    
})