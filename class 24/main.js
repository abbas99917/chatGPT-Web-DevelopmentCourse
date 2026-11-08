    // toggle them
    const toggle = document.querySelector(".theme-btn")
    const body = document.querySelector("body")
    toggle.addEventListener("click",()=>{
        body.classList.toggle("dark-mode")

        if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
        } else {
         localStorage.setItem("theme", "light")
        }   
    })
    
       let savedTheme = localStorage.getItem("theme")

        // Apply saved theme on page load
        if (savedTheme === "dark") {
        body.classList.add("dark-mode")
        } else {
        body.classList.remove("dark-mode")
    }


    //   select reference
    const addBtn = document.querySelector(".add-btn")
    const inputTask = document.querySelector("#task-input")
    const taskList = document.querySelector(".task-list")
    const desc = document.querySelector("#task-description")


    // localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // state
    let editTaskId = null




// localStorage
    const saveTaskLocalStorage = () =>{
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }
    saveTaskLocalStorage()




    // getting user values
    addBtn.addEventListener("click",()=>{
        let inputValue = inputTask.value.trim();
        let taskDescribtions = desc.value.trim()


        if(inputValue === "" || taskDescribtions === ""){
        alert("fill the field first")
        return
        }

        // edit btn logic
    if (editTaskId !== null) {

            let existingTask = tasks.find((item) => {
                return item.id === editTaskId;
            });

            if (existingTask) {
                existingTask.title = inputValue;
                existingTask.description = taskDescribtions
                 saveTaskLocalStorage()
                  updateState()
                    inputTask.value = "";
                    desc.value = "";
            }

            editTaskId = null;
            addBtn.innerText = "Add Task";

            renderTasks();
            // inputTask.value = "";
           
          
            return;
        }

    // Add new object task
        let obj = {
            id: Date.now(),
            title: inputValue,
            completed: false,
            description: taskDescribtions
        };

        tasks.push(obj);
         saveTaskLocalStorage()
         updateState()
        renderTasks();
        inputTask.value = "";
        desc.value = "";
        


    })


    // render task



    const renderTasks = (taskArray = tasks) =>{
    taskList.innerHTML = ""
        taskArray.forEach((item)=>{
            const tasksCart = document.createElement("div")
            tasksCart.classList.add("task-card")
            tasksCart.innerHTML = `
            
                            <div class="task-info">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                
                            ${item.completed? `<span class="completed-badge">Completed</span>`:`<span class="pending-badge">Pending</span>`}
                            </div>

                            <div class="task-actions">

                                <button class="complete-btn" data-id="${item.id}">
                                    <i class="fa-solid fa-check"></i>
                                </button>

                                <button class="edit-btn" data-id="${item.id}">
                                    <i class="fa-solid fa-pen"></i>
                                </button>

                                <button class="delete-btn" data-id="${item.id}">
                                    <i class="fa-solid fa-trash"></i>
                                </button>

                            </div>

                        `
                        taskList.appendChild(tasksCart)
        })
    }

    renderTasks()

    // delete functionality
    taskList.addEventListener("click",(e)=>{
    let dlt = e.target.closest(".delete-btn")

    if(!dlt) return
    let id = Number(dlt.dataset.id)
    console.log(id)

    tasks = tasks.filter((item)=>{
        return  item.id !==id
    })
    renderTasks()
     updateState()
     saveTaskLocalStorage()

    })






    // completed task logics starts from here
    taskList.addEventListener("click",(e)=>{
        let pending = e.target.closest(".complete-btn")

        if(!pending) return
        let btnId = Number(pending.dataset.id)
        console.log(btnId)

    let selectedTask =   tasks.find((tsk)=>{
            return tsk.id === btnId
        })
        if(!selectedTask)return

    selectedTask.completed = true
        renderTasks()
         updateState()
         saveTaskLocalStorage()
    })



    // Task edit functionality 

    taskList.addEventListener("click", (e) => {

        let edit = e.target.closest(".edit-btn");

        if (!edit) return;

        let editID = Number(edit.dataset.id);

        let selectTask = tasks.find((tsk) => {
            return tsk.id === editID;
        });

        if (selectTask) {

            inputTask.value = selectTask.title;
            editTaskId = selectTask.id;
            desc.value = selectTask.description;

            addBtn.innerText = "Update";
        }

    });


    // task search-functionality

    const searchTask = document.querySelector(".search-task")

    searchTask.addEventListener("input",()=>{

        let userSearchTask = searchTask.value.trim()

        let filters = tasks.filter((srch)=>{
            return srch.title.toLowerCase().includes(userSearchTask.toLowerCase())
        })
        renderTasks(filters)
    })





    // filter buttons

    const filterBtn = document.querySelectorAll(".filter-btn ")

    filterBtn.forEach((btn)=>{
        btn.addEventListener("click",()=>{
        let filterID = btn.dataset.filter

        if(filterID === "all"){
            renderTasks()
        }else if(filterID === "pending"){
        let filterarr = tasks.filter((item)=>{
                return item.completed === false
            })
            renderTasks(filterarr)

        }else if(filterID === "completed"){
        let filterarr =  tasks.filter((item)=>{
                return item.completed === true;
            })
            renderTasks(filterarr)
        }

        })
    })



    //  states loigcs

    const total = document.querySelector(".total")
    const pendingTsk = document.querySelector(".pendingTask")
    const completedTsk = document.querySelector(".completedTask")

    const updateState = () =>{

        total.innerText = tasks.length
       let pending =  tasks.filter((item)=> item.completed === false)
       pendingTsk.innerText = pending.length
        let complet = tasks.filter((item)=> item.completed === true)
        completedTsk.innerText = complet.length;
    }
updateState()



// 

