// main.js file

const menu = document.querySelector(".menu")
const first = document.querySelector(".first")
const second = document.querySelector(".second")
const third = document.querySelector(".third")


let state = false
menu.addEventListener("click", ()=>{
    
    
    if(state === false){
        first.style.transform = `translateY(8px) rotate(45deg)`
        second.style.display = "none"
         third.style.transform = `translateY(-8px) rotate(-45deg)`
    }else{
        first.style.transform = "none"
        third.style.transform = "none"
        second.style.display = "flex"
    }
    
    
    state = !state;
})

const navbar = document.querySelector(".navbar")

menu.addEventListener("click",()=>{

 navbar.classList.toggle("active")
    
})


// images

const images = [
    {
        images: "https://i.pinimg.com/1200x/fc/a0/17/fca017e8773725962b520f0f63b7cecc.jpg"
    },
    {
        images: "https://i.pinimg.com/736x/0d/98/41/0d98416f843206eeb663ee322343a451.jpg"
    },
    {
        images: "https://i.pinimg.com/1200x/25/01/3b/25013b01fdbf046e986424485bbd2455.jpg"
    },
    {
        images: "https://i.pinimg.com/736x/a7/7b/34/a77b3492fa562aa9e746c1da6d48c412.jpg"
    }
]

let imgIndex = 0;

const backImage = document.querySelector(".hero-section");

// First image
backImage.style.backgroundImage = `url("${images[imgIndex].images}")`;

setInterval(() => {

    imgIndex = (imgIndex + 1) % images.length;

    backImage.style.backgroundImage = `linear-gradient(rgba(20, 12, 7, 0.589), rgba(20, 12, 7, 0.685)),url("${images[imgIndex].images}")`;

}, 3000);



// cart images object of array

const productsCarts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 2500,
        quantity: 2,
        category: "Electronics",
        description: "High-quality wireless headphones with clear sound, comfortable ear cushions and long battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 4500,
        quantity: 1,
        category: "Electronics",
        description: "Modern smartwatch with fitness tracking, heart rate monitoring and smartphone notifications.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 3500,
        quantity: 2,
        category: "Fashion",
        description: "Lightweight running shoes with comfortable cushioning and durable rubber soles.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        id: 4,
        name: "Backpack",
        price: 1800,
        quantity: 1,
        category: "Accessories",
        description: "Spacious everyday backpack with multiple compartments and adjustable shoulder straps.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        id: 5,
        name: "Keyboard",
        price: 3000,
        quantity: 1,
        category: "Electronics",
        description: "Durable computer keyboard with comfortable keys and a modern minimalist design.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"
    }
];



const productContainer = document.querySelector(".product-container")

const displayProductsDynamically = () =>{

    productContainer.innerHTML = ""

    productsCarts.forEach((item)=>{
        let cart = document.createElement("div")
        cart.classList.add("product-one")
        cart.innerHTML = `  <div >
                <div class="proImage"><img src="${item.image}" alt=""></div>
                <div class="name-category">
                    <p class="name">${item.name}</p>
                    <span class="category">${item.category}</span>
                     </div>
                    <div class="reviews-icons">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <p class="description">${item.description}</p>
                    <div class="btn-price">
                        <p class="price">$${item.price}</p>
                        <button  class="add" data-id="${item.id}"><i class="fa-solid fa-cart-arrow-down" ></i>Add To Cart</button>
                    </div>
            </div>`

            productContainer.appendChild(cart)
    })
}

displayProductsDynamically()


// search product


const search = document.querySelector(".search")



// product addary

let cartArray = []
console.log(cartArray)




productContainer.addEventListener("click", (e) => {

    const count = document.querySelector(".count")
    const button = e.target.closest(".add");

    if (!button) return;

   let ProductID = Number(button.dataset.id)

   let findProduct = productsCarts.find((item)=>{
    return item.id === ProductID
   })
//dublicate cart checking
   let existingProduct = cartArray.find((item)=>{

    return item.id === ProductID
   
   })
   if(existingProduct){
    existingProduct.quantity += 1
   }else{

    let newProduct = {
        ...findProduct,
        quantity: 1
    }
    cartArray.push(newProduct)
      
}
   console.log(cartArray)
let totalCart = cartArray.length;
   count.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>${totalCart}`

//    localStorage
localStorage.setItem("addedCart",JSON.stringify(cartArray))
});


let getData = localStorage.getItem("addedCart",JSON.parse(cartArray))

console.log(getData)