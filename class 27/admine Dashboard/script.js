const sidebar = document.querySelectorAll(".sidebar-nav a")
const dashboardPage = document.querySelectorAll(".dashboard-page")

const productsContainer = document.querySelector(".products-container")
const searchProduct = document.querySelector("#searchProduct")


// toggle them


const themeBtn = document.querySelector(".ligt-dark");
const themeIcon = themeBtn.querySelector("i");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

});


sidebar.forEach((item)=>{
  item.addEventListener("click",(e)=>{
    e.preventDefault()
    
    let pageName = item.getAttribute("data-page")



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
let originalProducts = [
  {
    id: 1,
    name: "Smart Watch",
    image: "https://i.pinimg.com/736x/e3/70/4b/e3704b4a6d712b5687ccd1531a346568.jpg",
    category: "Electronics",
    rating: 4.5,
    reviews: 333,
    actualPrice: 1999,
    price: 999,
    stock: 12,
    description: "Smart watch with fitness tracking"
  },
  {
    id: 2,
    name: "Wireless Mouse",
    image: "https://i.pinimg.com/736x/3d/7a/6a/3d7a6a8fcdf53c3f321a3f8106173ba8.jpg",
    category: "Electronics",
    rating: 4.2,
    reviews: 129,
    actualPrice: 1200,
    price: 799,
    stock: 25,
    description: "Wireless mouse with ergonomic design"
  },
  {
    id: 3,
    name: "Men T-Shirt",
    image: "https://i.pinimg.com/1200x/22/aa/79/22aa79d3ecee4f9f46b99b6aa1f72ecc.jpg",
    category: "Fashion",
    rating: 4.0,
    reviews: 533,
    actualPrice: 1999,
    price: 1499,
    stock: 30,
    description: "Casual cotton T-shirt"
  },
  {
    id: 4,
    name: "Running Shoes",
    image: "https://i.pinimg.com/1200x/48/06/30/4806302d1fe63176997556e7ed2fa742.jpg",
    category: "Footwear",
    rating: 4.7,
    reviews: 133,
    actualPrice: 4500,
    price: 3499,
    stock: 18,
    description: "Comfortable running shoes"
  },
  {
    id: 5,
    name: "Backpack",
    image: "https://i.pinimg.com/736x/2e/15/11/2e15111f3c5e8ef6e073ea4609958a55.jpg",
    category: "Accessories",
    rating: 4.3,
    reviews: 333,
    actualPrice: 2500,
    price: 1899,
    stock: 20,
    description: "Durable everyday backpack"
  },
  {
    id: 6,
    name: "Headphones",
    image: "https://i.pinimg.com/736x/6c/2c/77/6c2c776320d29a31c9376197275a342b.jpg",
    category: "Electronics",
    rating: 4.6,
    reviews: 13,
    actualPrice: 3500,
    price: 2799,
    stock: 15,
    description: "Wireless stereo headphones"
  }
];



let products = JSON.parse(localStorage.getItem("storeProducts")) || originalProducts;



const updateDashboard = () => {
    statsNumber.textContent = products.length;
    orders.textContent = customerOrders.length;

    customers.textContent = new Set(
        customerOrders.map(item => item.customer.email)
    ).size;

    sale.textContent = `Rs ${customerOrders.reduce(
        (total, item) => total + Number(item.grandTotal), 0
    ).toLocaleString()}`;
};

let dashboardData  = {
  totalProducts,
  totalOrders,
  totalCustomers,
  totalRevenue
}





const dynamicProducts = (singlProducts = products) =>{
productsContainer.innerHTML = ""

singlProducts.forEach((item)=>{
  const cart = document.createElement("div")
  cart.classList.add("product-card")
  cart.innerHTML  = `
  
       
            <img src="${item.image}" alt="">
            <div class="name1category">
            <p class="proName">${item.name}</p>
            <span class="category">${item.category}</span>
            </div>
            <div class="review"> <i class="fa-solid fa-star"></i>
            <p class="reviews">${item.rating}(${item.reviews})</p></div>
            <div class="prices">
            <p class="price">$${item.price}</p>
            <p class="line-through">${item.actualPrice}</p>
            </div>
            <div class="flex">
            <button class="edit" data-id="${item.id}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete" data-id="${item.id}" ><i class="fa-solid fa-trash-can"></i></button>
            </div>
       `
       productsContainer.appendChild(cart)
})
}
dynamicProducts()



// search functionality

searchProduct.addEventListener("input",()=>{
  let userValue = searchProduct.value.trim().toLowerCase()

  let findProducts = products.filter((item)=>{
    return item.name.toLowerCase().includes(userValue)
  })
  dynamicProducts(findProducts)
  

})

productsContainer.addEventListener("click",(e)=>{

  let find = e.target.closest(".delete")
  if(!find) return

  let toNumber = Number(find.dataset.id)

  products = products.filter((item)=>{
  return item.id !==toNumber
  })
  dynamicProducts()
  localStorage.setItem("storeProducts",JSON.stringify(products))
})

// edit form
// model element
const editForm = document.querySelector("#editForm")
const editModel = document.querySelector("#editModel")
const editName = document.querySelector("#editName")
const editCatogery = document.querySelector("#editCategory")
const editPrice = document.querySelector("#editPrice")
const editActualPrice = document.querySelector("#editActualPrice")
const editStock = document.querySelector("#editStock")
const saveBtn = document.querySelector(".save-btn")
const cancel = document.querySelector(".cancel-btn")
const cross = document.querySelector(".close-modal")
const addProductModel = document.querySelector("#addProductModal")





// edit functionality
let editID = null;
productsContainer.addEventListener("click",(e)=>{

  let find = e.target.closest(".edit")
  if(!find)return

  let productID = Number(find.dataset.id)

let findItem =   products.find((item)=>{
    return item.id === productID
  })
  if(findItem){
    editID = productID
   editName.value = findItem.name;
   editCatogery.value = findItem.category;
   editPrice.value = findItem.price;
   editActualPrice.value = findItem.actualPrice;
   editStock.value = findItem.stock
    editModel.style.display = "flex"
  }


})

editForm.addEventListener("submit",(e)=>{
  e.preventDefault()

  if(editID){

   let existingProduct =    products.find((item)=>{
    return item.id === editID

      })
      if(existingProduct){
        existingProduct.name = editName.value;
        existingProduct.category = editCatogery.value;
        existingProduct.price = Number(editPrice.value);
        existingProduct.actualPrice = Number(editActualPrice.value)
        existingProduct.stock = Number(editStock.value);
      }
      editID = null
      localStorage.setItem("storeProducts",JSON.stringify(products))
      dynamicProducts()
      editForm.reset()
      editModel.style.display = "none"

  }

})

editModel.addEventListener("click",(e)=>{

  let findbtn = e.target.closest(".cancel-btn") || e.target.closest(".close-modal")
  if(!findbtn)return
  editModel.style.display = "none"
  editForm.reset()
})


  // new product element
  const addProductForm = document.querySelector("#addProductForm")
  const productName = document.querySelector("#productName")
  const productImage = document.querySelector("#productImage")
  const productCategory = document.querySelector("#productCategory")
  const productRating = document.querySelector("#productRating")
  const productReviews = document.querySelector("#productReviews")
  const productPrice = document.querySelector("#productPrice")
  const productActualPrice = document.querySelector("#productActualPrice")
  const addBtn = document.querySelector(".add-product-btn")
  const addProductBtn  = document.querySelector(".addProductBtn")
  const closeAddModal = document.querySelector(".close-add-modal");

  

  const search = document.querySelector("#search")

  // open model popup
  addProductBtn.addEventListener("click",()=>{
  addProductModel.classList.add("active")
  })

  // close model
  closeAddModal.addEventListener("click", () => {
      addProductModel.classList.remove("active");
  });

  addProductForm.addEventListener("submit",(e)=>{
    e.preventDefault()


    let proName = productName.value;
    let proImg = productImage.value;
    let proCategory = productCategory.value;
    let proRating = Number(productRating.value);
    let  proReviews = Number(productReviews.value);
    let proPrice = Number(productPrice.value);
    let proActualprice = Number(productActualPrice.value);


    let newProducts  = {
      id: Date.now(),
      name: proName,
      image: proImg,
      category: proCategory,
      rating: proRating,
      reviews: proReviews,
      price: proPrice,
      actualPrice: proActualprice,
      stock: 0
    }

    products.push(newProducts)
    localStorage.setItem("storeProducts",JSON.stringify(products))
    dynamicProducts()
    updateDashboard()
    addProductForm.reset()
    addProductModel.classList.remove("active");
    searchProduct.value = "";


  })



  // customers detailes
const ordersTbody = document.querySelector(".orders-tbody");
  let customerOrders  = JSON.parse(localStorage.getItem("customerOrders")) || [];
updateDashboard()

const showOrders = (searchPro = customerOrders) =>{
  ordersTbody.innerHTML = ""

  if(searchPro.length === 0){
   ordersTbody.innerHTML = `
            <tr>
              <td colspan="7">No Orders Found</td>
            </tr>
`;
return
  }
    searchPro.forEach((item)=>{
      const row = document.createElement("tr")

      row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.customer.name}</td>
      <td>${item.products.map(product => product.name).join(", ")}</td>
      <td>${item.status}</td>
      <td>${item.grandTotal}</td>
      <td>${item.date}</td>
      <td><select data-id="${item.id}">
      <option ${item.status === "Pending" ? "selected" : ""}>Pending</option>
      <option ${item.status === "Processing" ? "selected" : ""}>Processing</option>
      <option ${item.status === "Shipped" ? "selected" : ""}>Shipped</option>
      <option ${item.status === "Delivered" ? "selected" : ""}>Delivered</option>
      <option ${item.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
      </select> <button class="view" data-id="${item.id}">View-Order</button>
      <button class="delete-order" data-id="${item.id}">delete</button></td>
      
      `

      ordersTbody.appendChild(row)
  })
}
showOrders()

ordersTbody.addEventListener("change",(e)=>{
  let ID = Number(e.target.dataset.id)
if(!e.target.matches("select"))return
let product =   customerOrders.find((item)=>{
    return item.id === ID
  })
  if(product){
  product.status = e.target.value;
  localStorage.setItem("customerOrders", JSON.stringify(customerOrders));
  showOrders()

  }
})
search.addEventListener("input",()=>{
  let userValue = search.value.trim().toLowerCase()

 let  findPro = customerOrders.filter((item)=>{
    return item.customer.name.toLowerCase().includes(userValue)
  })
  showOrders(findPro)
})

  const button = document.querySelector(".buttons")
 

button.addEventListener("click",(e)=>{
  let status = e.target.dataset.page
  if(status === "all"){
    showOrders()
  }else if(status === "process"){
    let filterArr = customerOrders.filter((item)=>{
      return item.status === "Processing"
    })
    showOrders(filterArr)
   
  }else if(status === "shipped"){
    let filterArr = customerOrders.filter((item)=>{
      return item.status === "Shipped"
    })
    showOrders(filterArr)
  }else if(status === "pending"){
    let filteArr = customerOrders.filter((item)=>{
      return item.status === "Pending"
    })
    showOrders(filteArr)
  }else if(status === "cancel"){
     let filteArr = customerOrders.filter((item)=>{
      return item.status === "Cancelled"
    })
    showOrders(filteArr)
  }

})

const orderModal = document.querySelector("#orderModal");
const closeOrder = document.querySelector(".close-order");
const orderDetails = document.querySelector(".order-details");
const exportPdf = document.querySelector(".export-pdf")

ordersTbody.addEventListener("click",(e)=>{
  let findbtn = e.target.closest(".view")
  if(!findbtn)return 
  let dataID = Number(findbtn.dataset.id)

let existing=customerOrders.find((item)=>{
    return item.id === dataID
  })

if (existing) {

  let productHTML = existing.products.map((product) => {
    return `
     <div class="product-item">
      <p>Product: ${product.name}</p>
      <p>Quantity: ${product.quantity}</p>
      <p>Price: ${product.price}</p>
     </div>
    `;
  }).join("");


orderDetails.innerHTML = `
  <div class="order-info">
    <h3>Order #${existing.id}</h3>

    <div class="customer-info">
      <h4>Customer Information</h4>
      <p><span>Customer:</span> ${existing.customer.name}</p>
      <p><span>Email:</span> ${existing.customer.email}</p>
      <p><span>Phone:</span> ${existing.customer.phone}</p>
      <p><span>Address:</span> ${existing.customer.address}</p>
      <p><span>City:</span> ${existing.customer.city}</p>
    </div>

    <div class="products-info">
      <h4>Ordered Products</h4>
      ${productHTML}
    </div>
    <div class="payment-summary">
    <h2>Payment Summery</h2>
    <p>Subtotal:  ${existing.subtotal}</p>
    <p>Shipping:  ${existing.shipping}</p>
    <p>Grand Total:  ${existing.grandTotal}</p>
    </div>
    <div class="order-status">
    <h3>Order Information</h3>
    <p>Status: ${existing.status}</p>
    <p>Order Date: ${existing.date || "Not Available"}</p>
    </div>
  </div>
`;


  orderModal.classList.add("active");
}

})

// close details popup
closeOrder.addEventListener("click", () => {
  
  orderModal.classList.remove("active");
});

// delete order

ordersTbody.addEventListener("click",(e)=>{
  let findId = e.target.closest(".delete-order")

  if(!findId)return
let ask = confirm("Are you sure you want to delete this order?");

if (!ask) return;

  let change = Number(findId.dataset.id)

 customerOrders =  customerOrders.filter((item)=>{
    return item.id !==change
  })
  localStorage.setItem("customerOrders",JSON.stringify(customerOrders))
  showOrders()
  updateDashboard()
})


// export pdf code 

// Export Orders to PDF

exportPdf.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Customer Orders", 20, 20);

    doc.setFontSize(11);

    customerOrders.forEach((item, index) => {

        let y = 40 + (index * 40);

        doc.text(`Order ID: ${item.id}`, 20, y);
        doc.text(`Customer Name: ${item.customer.name}`, 20, y + 10);
        doc.text(`Status: ${item.status}`, 20, y + 20);
        doc.text(`Grand Total: ${item.grandTotal}`, 20, y + 30);

    });

    doc.save("customer-orders.pdf");

});

// logout

const logoutBtn = document.querySelector("#logoutBtn")

logoutBtn.addEventListener("click",(e)=>{
  e.preventDefault()

  window.location.href = "./login.html"

})


// recent order
const tableBody = document.querySelector(".table-body")


const showRecentOrders = () =>{
  tableBody.innerHTML = ""

  customerOrders.forEach((item)=>{

    const tableRow = document.createElement("tr")

    tableRow.innerHTML = `
    <td>${item.id}</td>
    <td>${item.customer.name}</td>
    <td>${item.date}</td>
    <td>${item.grandTotal}</td>
    <td> <span class="status-badge ${item.status.toLowerCase()}">${item.status}
    </span>
    </td>
    `

    tableBody.appendChild(tableRow)
  })
}
showRecentOrders()


// customers

const tbody = document.querySelector(".customers-tbody");
const customerCount = document.querySelector(".total-Customer")


const showCustomers = () => {
    tbody.innerHTML = "";

    let uniqueCustomers = [];

    // Unique customers find karo
    customerOrders.forEach((item) => {
        const existingCustomer = uniqueCustomers.find(
            (customer) => customer.customer.email === item.customer.email
        );

        if (!existingCustomer) {
          uniqueCustomers.push(item);
        }
    });

    // Customers table render karo
    uniqueCustomers.forEach((item, index) => {

        // Total orders
        const totalOrders = customerOrders.filter(
            order => order.customer.email === item.customer.email
        ).length;

        // Total spending
        const totalSpending = customerOrders
            .filter(order => order.customer.email === item.customer.email)
            .reduce((total, order) => total + Number(order.grandTotal), 0);

        const tableRow = document.createElement("tr");

        tableRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.customer.name}</td>
            <td>${item.customer.email}</td>
            <td>${totalOrders}</td>
            <td>Rs ${totalSpending.toLocaleString()}</td>
        `;

        tbody.appendChild(tableRow);
      });
      customerCount.textContent = uniqueCustomers.length;

};

showCustomers();


// sale charts
const saleChart = document.querySelector("#salesChart")
const salesFilter = document.querySelector("#salesFilter");


const months = ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec"];
const labels = months;



const getMonthlySales = () => {
    const monthlySales = new Array(12).fill(0);

    customerOrders.forEach((item) => {
     const [month, day, year] = item.date.split("/").map(Number);
        const monthIndex = month - 1;

        monthlySales[monthIndex] += Number(item.grandTotal);
    });
    

    return monthlySales;
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const getWeeklySales = () => {
    const weeklySales = new Array(7).fill(0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastSevenDays = new Date(today);
    lastSevenDays.setDate(today.getDate() - 6);

    customerOrders.forEach((item) => {
     const [month, day, year] = item.date.split("/").map(Number);

        const orderDate = new Date(year, month - 1, day);

        if (orderDate >= lastSevenDays && orderDate <= today) {
            const dayIndex = Math.floor(
                (orderDate - lastSevenDays) / (1000 * 60 * 60 * 24)
            );

            weeklySales[dayIndex] += Number(item.grandTotal);
        }
    });

    return weeklySales;
};

const getYearlySales = () => {
    const currentYear = new Date().getFullYear();

    const years = [];
    const yearlySales = [];

    for (let i = 4; i >= 0; i--) {
        years.push(currentYear - i);
        yearlySales.push(0);
    }

    customerOrders.forEach((item) => {
    const [month, day, year] = item.date.split("/").map(Number);
        const orderYear = year;

        const index = years.indexOf(orderYear);

        if (index !== -1) {
            yearlySales[index] += Number(item.grandTotal);
        }
    });

    return { years, yearlySales };
};




const mySalesChart = new Chart(saleChart, {
    type: "line",

    data: {
        labels: labels,

        datasets: [{
          data: getMonthlySales(),
            label: "Monthly Sales",
            borderWidth: 3,
            tension: 0.4,
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            pointBackgroundColor: "#6366f1",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            fill: true,
        }]
    },

options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: true,
            position: "top"
        }
    },

    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: "#f1f5f9"
            },
            ticks: {
                callback: function(value) {
                    return "Rs " + value.toLocaleString();
                }
            }
        },

        x: {
            grid: {
                display: false
            }
        }
    }
}

    
});

salesFilter.addEventListener("change",()=>{

 if (salesFilter.value === "monthly") {
        mySalesChart.data.labels = months;
        mySalesChart.data.datasets[0].data = getMonthlySales();

        mySalesChart.update();
    }else if (salesFilter.value === "weekly") {

    const today = new Date();
    const lastSevenDays = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        lastSevenDays.push(
            date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short"
            })
        );
    }

    mySalesChart.data.labels = lastSevenDays;
    mySalesChart.data.datasets[0].data = getWeeklySales();
   mySalesChart.data.datasets[0].label = "Monthly Sales";

    mySalesChart.update();
}else if (salesFilter.value === "yearly") {

    const result = getYearlySales();

    mySalesChart.data.labels = result.years;

    mySalesChart.data.datasets[0].data = result.yearlySales;

    mySalesChart.data.datasets[0].label = "Yearly Sales";

    mySalesChart.update();
}
})
