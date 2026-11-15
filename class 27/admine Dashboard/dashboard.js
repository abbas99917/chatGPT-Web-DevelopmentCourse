// sidebar

const sideBar = document.querySelector(".sidebar-menu")

const dashboardPage = document.querySelectorAll(".dashboard-page")

const dataPage = document.querySelectorAll("a[data-page]")

// page heading
const heading = document.querySelector(".dynamicHeading")

sideBar.addEventListener("click",(event)=>{
    // console.log(event.target)

    let findOption = event.target.closest("a[data-page]")
    
    if(!findOption) return
    // console.log(findOption.dataset)
    let pageName = findOption.dataset.page
    heading.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    // console.log("pagename:",pageName)
    event.preventDefault()

    dataPage.forEach((pro)=>{
        pro.classList.remove("active")
    })
    findOption.classList.add("active")

    // sidebar show content routing

    dashboardPage.forEach((Pro)=>{
        Pro.classList.remove("active");
    })
  let selectPage =   document.getElementById(pageName)
    selectPage.classList.add("active")


})



// array
let originalProducts = [
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
const productContainer  = document.querySelector(".products-container")

let products = JSON.parse(localStorage.getItem("admineCart")) || originalProducts;


const renderProducts = () =>{
    productContainer.innerHTML = ""

products.forEach((item)=>{
    const product = document.createElement("div")
    product.classList.add("product-card")

    product.innerHTML = `

    <div class="product-image">
        <img src="${item.image}" alt="Product Image">
    </div>

    <div class="product-details">

        <h3 class="product-name">${item.name}</h3>

        <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <span class="rating">${item.rating}</span>
            <span class="reviews">(${item.reviews})</span>
        </div>

        <div class="product-prices">
            <span class="current-price">Rs. ${item.price}</span>
            <span class="actual-price">Rs.${item.actualPrice}</span>
        </div>

        <div class="product-actions">
            <button class="edit-product" data-id="${item.id}">
                <i class="fa-solid fa-pen"></i> Edit
            </button>

            <button class="delete-product" data-id="${item.id}">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        </div>

    </div>
`

productContainer.appendChild(product)
})
}
renderProducts()


const editModal = document.querySelector("#editModal");
const closeModal = document.querySelector("#closeModal");
const cancelBtn = document.querySelector(".cancel-btn");

productContainer.addEventListener("click", (e) => {

    // EDIT
    let editBtn = e.target.closest(".edit-product");

    if (editBtn) {
        let findId = Number(editBtn.dataset.id);

        let findProduct = products.find((item) => {
            return item.id === findId;
        });

        console.log(findProduct);

        editModal.classList.add("show");
    }


    // DELETE
    let findbtn = e.target.closest(".delete-product");

    if (findbtn) {
        let findId = Number(findbtn.dataset.id);

        products = products.filter((item) => {
            return item.id !== findId;
        });

        renderProducts();

        localStorage.setItem("admineCart", JSON.stringify(products));
    }

});

