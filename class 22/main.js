    let first = document.querySelector(".first")
    let second = document.querySelector(".second")
    let third = document.querySelector(".third")


    let menu = document.querySelector(".menu")


    let isOpen = false
    menu.addEventListener("click",()=>{
        second.style.display = "none"

    if(isOpen === false){
        first.style.transform = "translateY(8px) rotate(45deg)"
        third.style.transform  = "translateY(-8px) rotate(-45deg)"
    }else if(isOpen === true){
        first.style.transform = "none"
        third.style.transform = "none"
        second.style.display = "block"
    }
    isOpen = !isOpen
    })


    const navbar = document.querySelector(".navbar")
    menu.addEventListener("click",()=>{

        navbar.classList.toggle("active")

    })  

    const images = [
        {
            image: "images/01.png"
        },
        {
            image: "images/02.png"
        },
        {
            image: "images/03.png"

        },
        {
            image: "images/hero-image.png"
        }
    ]
    let arrIndex = 0;
    let heroImage = document.querySelector(".hero-image");

    setInterval(() => {
        heroImage.src = images[arrIndex].image;

        arrIndex++;

        if (arrIndex >= images.length) {
            arrIndex = 0;
        }
    }, 3000);


    // cartproducts

    const productsCart = [
        {
            id: 1,
            image: "https://i.pinimg.com/736x/f0/65/9b/f0659b73aaba78fad868b1b1960f574a.jpg",
            name: "Macbook Air M3",
            category: "Electronics",
            description: "Powerfull laptop wit M3 chip and all-day battery life.",
            price: 120
        },
        {
            id: 2,
            image: "https://i.pinimg.com/1200x/ad/0e/7a/ad0e7a12459c3be9a8beadf683271c85.jpg",
            name: "AirPods Pro",
            category: "Electronics",
            description: "Wireless earbuds with active noise cancelassion",
            price: 300
        },
        {
            id: 3,
            image: "https://i.pinimg.com/1200x/24/0f/c7/240fc7807b8fad426560f6630463e5e9.jpg",
            name: "Sports Shoes",
            category: "Clothes",
            description: "Comfortable running sports shoes",
            price: 200
        },
        {
            id: 4,   
            image: "https://i.pinimg.com/736x/4e/dd/3a/4edd3abe57c8822dac69ddc3e25e5f2e.jpg",
            name: "Wireless Headphone",
            category: "Electronics",
            description: "Hight-quality wireless headphone with noise cancellations",
            price: 250
        }
    ]

    const cartContainer = document.querySelector(".cart-container")

    const displayCart = () =>{
    cartContainer.innerHTML = ""
        productsCart.forEach((item,index)=>{
            const cart = document.createElement("div")
            cart.classList.add("product-cart")

        cart.innerHTML  = `
        <div class="one unique">
                <div class="cart-image"><img src="${item.image}" alt=""></div>
                <div class="mac">
                    <h4>${item.name}</h4>
                    <span class="category">${item.category}</span>
                </div>
                <p class="desc">${item.description}</p>
                <div class="btn-price">
                    <p>$${item.price}</p>
                    <button onclick="cartCount(${index})" ><i class="fa-solid fa-cart-shopping"></i>add to cart</button>
                </div>
            </div>
        `
        cartContainer.appendChild(cart)
    })

    }
    displayCart()


    // cart count
    // Cart count
    let count = 0;
    const circle = document.querySelector(".circle");

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const cartCount = (index) => {
        const product = productsCart[index];

        const existingProduct = cartItems.find((item) => {
            return item.id === product.id;
        });

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            });
        }

        count++;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        circle.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${count}`;

    
    };

    const updateCartCount = () =>{
        const cartCount = cartItems.reduce((total,item)=>{
            return total + item.quantity;
        },0)
    circle.innerHTML =  `<i class="fa-solid fa-cart-shopping"></i> ${cartCount}`;
    }

    updateCartCount()
