// toggle them
const toggle = document.querySelector(".theme-btn")
const body = document.querySelector("body")
toggle.addEventListener("click",()=>{
    body.classList.toggle("dark-mode")
 
})


//   
const addBtn = document.querySelector(".add-btn")
const inputTask = document.querySelector("#task-input")
const taskList = document.querySelector(".task-list")


let tasks = [];
addBtn.addEventListener("click",()=>{
    let inputValue = inputTask.value.trim();

    if(inputValue === ""){
      alert("fill the field first")
      return
    }
   tasks.push(inputValue)
   console.log(tasks)
})

