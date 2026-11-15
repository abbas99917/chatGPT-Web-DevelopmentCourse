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


const renderProducts = (item = products) =>{
    productContainer.innerHTML = ""

item.forEach((item)=>{
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

let currentEditId = null;
productContainer.addEventListener("click", (e) => {

    // EDIT
    let editBtn = e.target.closest(".edit-product");
    
    if (editBtn) {
        let findId = Number(editBtn.dataset.id);
        currentEditId = findId;

        let findProduct = products.find((item) => {
            return item.id === findId;
        });
        editName.value = findProduct.name;
        editImage.value = findProduct.image;
        editRating.value = findProduct.rating;
        editReviews.value = findProduct.reviews;
        editPrice.value = findProduct.price;
        editActualPrice.value = findProduct.actualPrice;

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

const editProductForm = document.querySelector("#editProductForm");


editProductForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    updatedName  = editName.value;
    updatedImage = editImage.value
    updatedRating = Number(editRating.value)
    updatedReviews = Number(editReviews.value)
    updatedPrice = Number(editPrice.value)
    updatedActuallPrice = Number(editActualPrice.value)



  products =  products.map((item)=>{
        if(item.id === currentEditId){
            return{
                ...item,
                name: updatedName,
                image: updatedImage,
                rating: updatedRating,
                reviews: updatedReviews,
                price: updatedPrice,
                actualPrice: updatedActuallPrice
            }
        }
        return item
    })
    localStorage.setItem("admineCart",JSON.stringify(products))
    renderProducts()
    editModal.classList.remove("show")

    editProductForm.reset()
    currentEditId = null


})



// products search

const search = document.querySelector(".search")
search.addEventListener("input",()=>{
    searchProducts()
})

const searchProducts = () =>{
let searchValue = search.value.trim().toLowerCase();
 let   findSearch = products.filter((item)=>{
        return item.name.toLowerCase().includes(searchValue)
    })
    renderProducts(findSearch)
}


// add new product to the arrray

const addProductBtn = document.querySelector(".add-product-btn");
const addModal = document.querySelector("#addModal");
const closeAddModal = document.querySelector("#closeAddModal");
const cancelAdd = document.querySelector("#cancelAdd");

// const parent = document.querySelector(".modal-overlay")

addProductBtn.addEventListener("click",()=>{
    openPopup()
})

const openPopup = () =>{
    addModal.classList.add("show")
}
addModal.addEventListener("click", (e) => {

    if (
        e.target.closest("#closeAddModal") ||
        e.target.closest("#cancelAdd")
    ) {
        addModal.classList.remove("show");
    }

    if (e.target === addModal) {
        addModal.classList.remove("show");
    }
   

});


// add product fonrm selectors

const addProductForm = document.querySelector("#addProductForm");

const addName = document.querySelector("#addName");
const addImage = document.querySelector("#addImage");
const addRating = document.querySelector("#addRating");
const addReviews = document.querySelector("#addReviews");
const addPrice = document.querySelector("#addPrice");
const addActualPrice = document.querySelector("#addActualPrice");


const addNewProduct = () =>{

    let proName = addName.value;
    let proImage = addImage.value;
    let proRating = addRating.value;
    let proReviews = addReviews.value
    let proPrice = addPrice.value;
    let proActualPrice = addActualPrice.value;


    let newProducts = {
        id: Date.now(),
        name: proName,
        image: proImage,
        rating: Number(proRating),
        reviews: Number(proReviews),
        price: Number(proPrice),
        actualPrice: Number(proActualPrice)
    }

    products.push(newProducts)
    localStorage.setItem("admineCart",JSON.stringify(products))
    renderProducts()
    

}
addProductForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    addNewProduct()
    addProductForm.reset()
    addModal.classList.remove("show")
})