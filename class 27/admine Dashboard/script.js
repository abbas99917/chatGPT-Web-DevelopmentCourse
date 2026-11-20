const sidebar = document.querySelectorAll(".sidebar-nav a")
const dashboardPage = document.querySelectorAll(".dashboard-page")

const table = document.querySelector(".products-table-body")
const searchProduct = document.querySelector("#searchProduct")
const editModel = document.querySelector("#editModel")

sidebar.forEach((item)=>{
  item.addEventListener("click",(e)=>{
    e.preventDefault()
    
    let pageName = item.getAttribute("data-page")

    console.log(pageName)

    dashboardPage.forEach((page)=>{
        page.style.display = "none";
      if(page.id === pageName){
          page.style.display = "block"
      }
    })

    // active classes
    sidebar.forEach((item)=>{
        item.classList.remove("active");
    })
    item.classList.add("active")
  })

})

dashboardPage.forEach((page)=>{
   page.style.display = "none"
})

dashboardPage.forEach((page)=>{
    if( page.id === "dashboard"){
        page.style.display = "block"
    }
})

// side bar toggle

let totalProducts = 200;
let totalOrders =  100;
let totalCustomers = 60;
let totalRevenue = 50000;

const orders = document.querySelector(".orders")
const statsNumber = document.querySelector(".stats-number")
const customers = document.querySelector(".customers")
const sale = document.querySelector(".sale")


// products array
let products = [
  {
    id: 1,
    name: "Smart Watch",
    image: "https://placehold.co/100x100?text=Watch",
    category: "Electronics",
    rating: 4.5,
    actualPrice: 1999,
    price: 999,
    stock: 12,
    description: "Smart watch with fitness tracking"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    image: "https://placehold.co/100x100?text=Mouse",
    category: "Electronics",
    rating: 4.2,
    actualPrice: 1200,
    price: 799,
    stock: 25,
    description: "Wireless mouse with ergonomic design"
  },
  {
    id: 3,
    name: "Men T-Shirt",
    image: "https://placehold.co/100x100?text=T-Shirt",
    category: "Fashion",
    rating: 4.0,
    actualPrice: 1999,
    price: 1499,
    stock: 30,
    description: "Casual cotton T-shirt"
  },
  {
    id: 4,
    name: "Running Shoes",
    image: "https://placehold.co/100x100?text=Shoes",
    category: "Footwear",
    rating: 4.7,
    actualPrice: 4500,
    price: 3499,
    stock: 18,
    description: "Comfortable running shoes"
  },
  {
    id: 5,
    name: "Backpack",
    image: "https://placehold.co/100x100?text=Bag",
    category: "Accessories",
    rating: 4.3,
    actualPrice: 2500,
    price: 1899,
    stock: 20,
    description: "Durable everyday backpack"
  },
  {
    id: 6,
    name: "Headphones",
    image: "https://placehold.co/100x100?text=Headphones",
    category: "Electronics",
    rating: 4.6,
    actualPrice: 3500,
    price: 2799,
    stock: 15,
    description: "Wireless stereo headphones"
  }
];

// localStorage.setItem("storeProducts",JSON.stringify(products))

let loadProduct = JSON.parse(localStorage.getItem("storeProducts")) || []



if (loadProduct.length > 0) {
    products = loadProduct;
}

const updateDashboard = () =>{
statsNumber.textContent = products.length;
orders.textContent = dashboardData.totalOrders;
customers.textContent = dashboardData.totalCustomers;
sale.textContent = `Rs ${dashboardData.totalRevenue}`;


}

let dashboardData  = {
  totalProducts,
  totalOrders,
  totalCustomers,
  totalRevenue
}


updateDashboard()


const dynamicProducts = (product = products) =>{

  table.innerHTML = ""
  product.forEach((item)=>{

const trow = document.createElement("tr")
trow.innerHTML = `

<td><img src ="${item.image}" class="proimg"  width="50" height="50"></td>
<td class="same">${item.id}</td>
<td class="same">${item.name}</td>
<td class="same">${item.category}</td>
<td class="same">${item.rating}</td>
<td class="same">${item.actualPrice}</td>
<td class="same">${item.price}</td>
<td class="same">${item.stock}</td>
<td class="same"><button class="edit" data-id="${item.id}"><i class="fa-regular fa-pen-to-square"></i></button><button class="delete" data-id="${item.id}"><i class="fa-solid fa-trash-can"></i></button></td>

`

table.appendChild(trow)
})
}
dynamicProducts()


// search products 

searchProduct.addEventListener("input",()=>{
  let userValue = searchProduct.value.trim().toLocaleLowerCase()

let filterProducts =  products.filter((item)=>{
    return  item.name.trim().toLocaleLowerCase().includes(userValue)
  })
  dynamicProducts(filterProducts)

})

// delete product from array

table.addEventListener("click",(e)=>{

  let findID = e.target.closest(".delete")
  if(!findID) return
  let change = Number(findID.dataset.id)
  console.log(change)


products = products.filter((item)=>{
    return item.id !== change
  })
  dynamicProducts()
  updateDashboard()
  localStorage.setItem("storeProducts",JSON.stringify(products))


})

// edit buttons
table.addEventListener("click",(e)=>{

  let findEdit = e.target.closest(".edit")
  if(!findEdit) return
  let change = Number(findEdit.dataset.id)
  // console.log(change)

 let findProduct =  products.find((item)=>{
    return item.id === change
  })
console.log(findProduct.name)



})


