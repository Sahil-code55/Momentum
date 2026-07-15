const openGoalsBtn = document.getElementById("openGoalsBtn");
const goalsSection = document.getElementById("goals-section");
const goalsBackBtn = document.getElementById("goalsBackBtn");


const goalsModule = {

        goals: [],
    
    init() {
    
    this.goalProgress = document.getElementById("goalProgress");
    this.goalProgressBar = document.getElementById("goalProgressBar");
    this.goalInput = document.getElementById("goalInput");
    this.addGoalBtn = document.getElementById("addGoalBtn");
    this.goalList = document.getElementById("goalList");
    this.goalEmptyState = document.querySelector("#goals-section .goal-empty-state");
    this.goalCompleteCount = document.getElementById("goalCompleteCount");
    this.goalCompleteProgress = document.getElementById("goalCompleteProgress");


        this.loadGoals();
        this.render();
     //=======================add goal event ================================// 
        this.addGoalBtn.addEventListener("click", () => {
        this.handleAddGoal();
    });
    // ================enter create goal feture===========================//
        this.goalInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
        this.handleAddGoal();
    }
    });
    //==================checkbox & delete btn checking ============================//
    this.goalList.addEventListener("click",(e)=>{
     const checkbox = e.target.closest(".goals-checkbox");
       if (checkbox) {
        const goalId = checkbox.closest(".task-item").dataset.id;
        this.toggleGoal(goalId);
    }

    const deleteBtn = e.target.closest(".btn-delete-task");

    if (deleteBtn) {
        const goalId = deleteBtn.closest(".task-item").dataset.id;
        this.deleteGoal(goalId);
    }
     

    });



        // ================open close feature===================//
          openGoalsBtn.addEventListener("click",function(){
            goalsSection.classList.add("active");
            dashboardSection.classList.remove("active");
            
        });
         goalsBackBtn.addEventListener("click",function(){
        goalsSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });
    },
    

    



//===================== handle  Add goal================//
    handleAddGoal() {
     const text = this.goalInput.value.trim();
    if (text === "") return;
    this.addGoal(text);
    this.goalInput.value = "";

    },
//=====================  Add goal================//
    addGoal(text) {
    const newGoal = {
        id: Date.now().toString(),
        text,
        completed: false
    };
    this.goals.push(newGoal);
    this.saveGoals();
    this.render();
    },
//===================== delete goal================//
    deleteGoal(id) {
     this.goals = this.goals.filter(
        goal => goal.id !== id
    );
    this.saveGoals();
    this.render();
    },
// ==================toggle goal======================//
    toggleGoal(id) {     
    const goal = this.goals.find(
        goal => goal.id === id
    );
    if (goal) {
        goal.completed = !goal.completed;
        this.saveGoals();
        this.render();
    }
    },
// ======================render goal============================//
    render() {
      this.goalList.innerHTML = "";
    if (this.goals.length === 0) {
    this.goalEmptyState.classList.remove("hidden");
     } 
    else {
    this.goalEmptyState.classList.add("hidden");
}
        this.goals.forEach((goal)=>{
        const li = document.createElement("li");
        li.className = "task-item";
        li.dataset.id = goal.id;
        li.innerHTML= ` <div class="task-left">
                                <div class="custom-checkbox-wrapper">
                                    <input type="checkbox" 
                                    class="custom-checkbox  goals-checkbox"
                                    ${goal.completed ? "checked" : ""}>
                                    <span class="checkbox-visual">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <path  d="M20 6 9 17l-5-5"/>
                                        </svg>
                                    </span>
                                </div>
                                <span class="task-text ${goal.completed ? "goal-completed-text" : ""}"
                                >${goal.text}</span>
                            </div>
                              <button class="btn-delete-task">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                </svg>
                            </button>`
    
    
     this.goalList.appendChild(li);
    });
    this.updateProgress();
    },
// =======================update progress & goalCard Dashboard ======================//
    updateProgress() {
    const totalGoals = this.goals.length;
   const completedGoals = this.goals.filter((goal) => goal.completed).length;
   let percentage = 0;
   if (totalGoals > 0) {
    percentage = Math.round((completedGoals / totalGoals) * 100);
 }
 this.goalProgress.textContent =`${completedGoals} of ${totalGoals} goals completed (${percentage}%)`;
 this.goalProgressBar.style.width = `${percentage}%`;
//  goalCard dashboard ui
 this.goalCompleteCount.textContent = `${completedGoals}/${this.goals.length} Completed`;
 this.goalCompleteProgress.textContent = `${percentage}% Progress`;
    },
// =========================save goal localstorage==========================//
    saveGoals() {
    storageModule.save("goals", this.goals);
    },
// =========================load goal localstorage==========================//
    loadGoals() {
     const savedGoals = storageModule.load("goals");
    if (savedGoals) {
    this.goals = savedGoals;
    }
    }

};
