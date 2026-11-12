// main.js files
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



// products array

const products = [
    {
        id: 1,
        name: "Smart Watch Pro",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        rating: 4.5,
        reviews: 128,
        price: 129.99,
        actualPrice: 199.99,
        quantity: 1
    },
    {
        id: 2,
        name: "Wireless Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        rating: 4.8,
        reviews: 96,
        price: 89.99,
        actualPrice: 129.99,
        quantity: 1
    },
    {
        id: 3,
        name: "Leather Backpack",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        rating: 4.6,
        reviews: 74,
        price: 59.99,
        actualPrice: 89.99,
        quantity: 1
    },
    {
        id: 4,
        name: "Running Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        rating: 4.7,
        reviews: 63,
        price: 66.99,
        actualPrice: 119.99,
        quantity: 1
    },
    {
        id: 5,
        name: "Smartphone 128GB",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        rating: 4.5,
        reviews: 172,
        price: 699.99,
        actualPrice: 899.99,
        quantity: 1
    },
    {
        id: 6,
        name: "Classic Cotton T-Shirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        rating: 4.6,
        reviews: 85,
        price: 29.99,
        actualPrice: 49.99,
        quantity: 1
}
];


// renderProduct fuctins
const wrapper = document.querySelector(".card-wrapper")

const renderProducts = () =>{
wrapper.innerHTML = ""


products.forEach((item)=>{

    const cart = document.createElement("div")
    cart.innerHTML = `
      <div class="cart-one common">
                 <div class="img">   <img src="${item.image}" alt=""></div>
                 <p class="prductName">${item.name}</p>
                 <div class="ratting">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <p>(${item.rating})</p>
                 </div>
                 <div class="priceActual">
                    <p class="original">$${item.price}</p>
                    <p class="fixedPricelinethrough">$${item.actualPrice}</p>
                 </div>
                 <button class="addCart" data-set="${item.id}">Add To Cart</button>
                </div>`
                wrapper.appendChild(cart)
})

}
renderProducts()

  let addedCart =  JSON.parse(localStorage.getItem("shoppingCarts")) || [];





wrapper.addEventListener("click",(e)=>{

    let ClickedID = e.target.dataset.set
    let idType = Number(ClickedID)
    console.log(idType)

    // find product usign find method

    let proID = products.find((item)=>{
        return item.id === idType
    })

    
  

    // duplicate  cart chicked 

    let existingProduct = addedCart.find((item)=>{
        return item.id === proID.id
    })

    if(existingProduct){
        existingProduct.quantity += 1
    }else{
        let newProduct =  {
            ... proID,
            quantity: 1
        }
        addedCart.push(newProduct)
    }
    // save data to localStorage
      localStorage.setItem("shoppingCarts", JSON.stringify(addedCart))
      showCount()
      
})



const showCount =  () =>{
const count = document.querySelector(".count")

count.innerText = addedCart.length;


}
showCount()



// countdown timmer 

// Select HTML elements
const countdownBoxes = document.querySelectorAll(".countdown-box");

const days = countdownBoxes[0].querySelector("h2");
const hours = countdownBoxes[1].querySelector("h2");
const minutes = countdownBoxes[2].querySelector("h2");
const seconds = countdownBoxes[3].querySelector("h2");

// Set Sale Ending Date
let endDate = new Date("December 1, 2026 23:59:59").getTime();

// Countdown Function
let countdown = setInterval(() => {

    // Get Current Time
    let now = new Date().getTime();

    // Calculate Remaining Time
    let distance = endDate - now;

    // Calculate Days, Hours, Minutes, Seconds
    let day = Math.floor(distance / (1000 * 60 * 60 * 24));

    let hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    let second = Math.floor((distance % (1000 * 60)) / 1000);

    // Display Countdown
    days.innerHTML = String(day).padStart(2, "0");
    hours.innerHTML = String(hour).padStart(2, "0");
    minutes.innerHTML = String(minute).padStart(2, "0");
    seconds.innerHTML = String(second).padStart(2, "0");

    // Check Sale Ending
    if (distance <= 0) {

        clearInterval(countdown);

        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";

    }

}, 1000);