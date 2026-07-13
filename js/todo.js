/**
 * FocusHub - Todo Module
 * 
 * Manages adding, toggle completed status, deleting, and rendering todo tasks.
 * Hooks into input fields, lists, and task counters.
 */

const openTodoBtn = document.querySelector("#openTodoBtn")
const todoSection = document.getElementById("todo-section")
const dashboardSection = document.getElementById("dashboard-section")
const todoBackBtn = document.getElementById("todoBackBtn")
const numberTask = document.querySelector("#numberTask")


const todoModule = {
    // Selectors:
    // Input: #todoInput
    // Add Button: #addTodoBtn
    // List: #todoList
    // Counters: #todoCount, #todoCompletedCount on dashboard
    tasks : [],
    
    init() {
     
        this.todoInput = document.getElementById("todoInput");
        this.addTodoBtn = document.getElementById("addTodoBtn");
        this.todoList = document.getElementById("todoList");
        this.emptyState = document.querySelector("#todo-section .empty-state");
        this.todoCount = document.getElementById("todoCount");
        this.todoCompletedCount = document.getElementById("todoCompletedCount");

        // setup local storage
        const savedTasks = storageModule.load("todos");
         if (savedTasks) {
        this.tasks = savedTasks;
         }
         this.render();

   

        //  add task
     this.addTodoBtn.addEventListener("click", () => {
    this.handleAddTask();
});
   this.todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        this.handleAddTask();
    }
});

        //delete
        this.todoList.addEventListener("click", (e) => {
    const checkbox = e.target.closest(".custom-checkbox");
    if (checkbox) {
  const taskId = checkbox.closest(".task-item").dataset.id;
  this.toggleTask(taskId)
}
    //delete setup
        const deleteBtn = e.target.closest(".btn-delete-task");
        if(deleteBtn) {
    const taskId = deleteBtn.closest(".task-item").dataset.id;
    this.deleteTask(taskId);
}
        
    });

        //  navigation
        console.log('Todo module placeholder loaded.');
        openTodoBtn.addEventListener("click",function(){
            todoSection.classList.add("active");
            dashboardSection.classList.remove("active");   
        });
        todoBackBtn.addEventListener("click",function(){
        todoSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });

 
    },
    //update the todoCard dashboard
        updateDashboardCounters(){
this.todoCount.textContent = `${this.tasks.length} Tasks`;
const completedTasks = this.tasks.filter(task => task.completed).length;
this.todoCompletedCount.textContent = `${completedTasks} Completed`;
}
,

        handleAddTask() {
        // Create task object and append to list
     const text = this.todoInput.value.trim();
     if(text === "") return;
    this.addTask(text);
    this.todoInput.value = "";   
    },
    
    addTask(text) {
        const newTask ={
        id :Date.now().toString(),
        text:text,
        completed : false
       }

        this.tasks.push(newTask);
        this.saveTasks();
       
        this.render()
        
    },
    
    deleteTask(id) {
        // Remove task and re-render
         this.tasks = this.tasks.filter((task) => task.id !== id);
         this.saveTasks();
        this.render();
    },
    
    toggleTask(id) {
        // Toggle complete and update styles
      const task = this.tasks.find(task => task.id === id);
         if (task) {
        task.completed = !task.completed;
        this.saveTasks();

        this.render();
    }
    },

    // save task function localStorage
 saveTasks() {
    storageModule.save("todos", this.tasks);
},

    render(){
    this.todoList.innerHTML = "";
    if (this.tasks.length === 0) {
    this.emptyState.classList.remove("hidden");
     } 
    else {
    this.emptyState.classList.add("hidden");
}
        this.tasks.forEach((task)=>{

        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.id = task.id;
        li.innerHTML =`  <div class="task-left">
                                <div class="custom-checkbox-wrapper">
                                    <input type="checkbox" class="custom-checkbox"
                                    ${task.completed ? "checked" : ""}>
                                    <span class="checkbox-visual">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <path  d="M20 6 9 17l-5-5"/>
                                        </svg>
                                    </span>
                                </div>
                                <span class="task-text ${task.completed ? "completed-text" : ""}"
                                >${task.text}</span>
                            </div>
                              <button class="btn-delete-task">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                </svg>
                            </button>`
                            
                        
        this.todoList.appendChild(li);
            
            

        })
          this.updateDashboardCounters();
            }
};

