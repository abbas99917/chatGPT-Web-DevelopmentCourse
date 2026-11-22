const login = document.querySelector("#email")
const password = document.querySelector("#password")
const loginBtn = document.querySelector("#loginBtn")
const error = document.querySelector("#errorMessage")
const loginForm = document.querySelector("#loginForm")


loginForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    if(login.value === "admin@gmail.com" && password.value ==="123"){
       window.location.href = "./index.html";
    }else{
    error.textContent = "Invalid email or password!";
    }
})
