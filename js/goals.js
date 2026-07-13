/**
 * FocusHub - Daily Goals Module
 * 
 * Manages daily goal additions, deletion, status checking, and rendering.
 * Updates goal list and progress bars on both the dashboard card and the goals screen.
 */
const openGoalsBtn = document.getElementById("openGoalsBtn");
const goalsSection = document.getElementById("goals-section");
const goalsBackBtn = document.getElementById("goalsBackBtn");


const goalsModule = {
    // Selectors:
    // Input: #goalInput
    // Add Button: #addGoalBtn
    // List: #goalList
    // Progress UI: #goalProgress on dashboard, #goalsProgressText
        goals: [],
    
    init() {
        console.log('Goals module placeholder loaded.');
        this.goalProgress = document.getElementById("goalProgress");
        this.goalProgressBar = document.getElementById("goalProgressBar");
        this.goalInput = document.getElementById("goalInput");
        this.addGoalBtn = document.getElementById("addGoalBtn");
        this.goalList = document.getElementById("goalList");


        this.loadGoals();
        this.render();
     //=======================add goal event ================================// 
        this.addGoalBtn.addEventListener("click", () => {
        this.handleAddGoal();
    });
    // ================enter create goal feture===========================//
        this.goalInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
        this.handleAddTask();
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
    handleAddGoal() {
     const text = this.goalInput.value.trim();
    if (text === "") return;
    this.addGoal(text);
    this.goalInput.value = "";

    },

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

    deleteGoal() {

    },

    toggleGoal() {

    },

    render() {

    },

    updateProgress() {
    const totalGoals = this.goals.length;
   const completedGoals = this.goals.filter((goal) => goal.completed).length;
   let percentage = 0;
   if (totalGoals > 0) {
    percentage = Math.round((completedGoals / totalGoals) * 100);
 }

 this.goalProgress.textContent = `${completedGoals} of ${totalGoals} goals completed (${percentage}%)`;
 this.goalProgressBar.style.width = `${percentage}%`;
    },

    saveGoals() {

    },

    loadGoals() {

    }

};
