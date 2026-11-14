const fullName = document.querySelector("#fullName")
const email = document.querySelector("#email")
const phone = document.querySelector("#phone")

const address = document.querySelector("#address")
const city = document.querySelector("#city")
const postalCode = document.querySelector("#postal")
const notes = document.querySelector("#notes")

// form validations starts form here

const formValidation = () =>{

    if(fullName.value.trim()=== ""){
        alert("Please fill the form first")
        return false;
    }
    if(email.value.trim() === ""){
        alert("please enter your email")
        return false
    }
       if(!email.value.trim().includes("@")){
        alert("Please Enter a valid Email")
        return false;
      }
      if(!email.value.trim().includes(".")){
        alert("please enter a valid email")
        return false
      }
      if(phone.value.trim()=== ""){
        alert("please enter your phone number")
        return false
      }
      if (!/^[0-9]+$/.test(phone.value.trim())) {
    alert("Please enter numbers only")
    return false
    }
    if(phone.value.trim().length !== 11){
        alert("phone number must be 11 digit")
        return false
    }
      if(address.value.trim()===""){
        alert("Please enter your home / city / name")
        return false
      }
      if(city.value.trim() === ""){
        alert("Please enter your city name")
        return false
      }
      if(postalCode.value.trim()=== ""){
        alert("Please enter your postal code")
        return false
      }
     
        return true
}

const form = document.querySelector(".checkedoutForm")
// steps 02
const receiveValues = () =>{
    
    let customerName = fullName.value;
    let customerEmail = email.value;
    let customerPhone = phone.value;
    let customerAddress = address.value;
    let customerCity = city.value;
    let customerPostalCode = postalCode.value;
    let customerNotes = notes.value;


    let customerDetails = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        city: customerCity,
        postalCode: customerPostalCode,
        notes: customerNotes
    }
  
    // steps 05
    let orderDetails = {
        customer: customerDetails,
        products: readProducts,
        subtotal: summery.subtotal,
        shipping: summery.shipping,
        grandTotal: summery.grandTotal
        
    }
   
    readOrder.push(orderDetails)
    localStorage.setItem("customerOrders",JSON.stringify(readOrder))
    localStorage.removeItem("newCarts")
    form.reset()


    console.log("Customer Orders:", readOrder);
    console.log("Total Orders:", readOrder.length);

    
}

// steps 05
let readOrder = JSON.parse(localStorage.getItem("customerOrders")) || [];


// steps 01
const placeBtn = document.querySelector(".place-order-btn")
placeBtn.addEventListener("click",()=>{
   
  if( formValidation()){
      receiveValues()

     window.location.href = "conformation.html"
      
  }

})

// steps 03
let readProducts = JSON.parse(localStorage.getItem("newCarts")) || [];
// console.log(readProducts)


// subtotal loigcs
// steps 04
const subtotal = document.querySelector(".checkout-subtotal")
const shipping = document.querySelector(".checkout-shipping")
const grandTotal = document.querySelector(".checkout-grand-total")

const finalSummery = () =>{
    let finalCalculations = readProducts.reduce((total,item)=>{
    return total + (item.price * item.quantity)
},0)

let delivery = readProducts.length === 0 ? 0 : 200;
subtotal.textContent = `$ ${finalCalculations}`;
shipping.textContent = `$ ${delivery}`;
grandTotal.textContent = `$ ${finalCalculations + delivery}`

return {
    subtotal: finalCalculations,
    shipping: delivery,
    grandTotal: finalCalculations + delivery
}


}

let summery = finalSummery()
