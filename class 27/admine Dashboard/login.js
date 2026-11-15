const email = document.querySelector("#email")
const password = document.querySelector("#password")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Email aur password verification

    if (email.value === "admin@gmail.com" &&
        password.value === "12345") {

        window.location.href = "dashboard.html";

    } else {
        errorMessage.textContent = "Invalid Email or Password!";
    }
});