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
    
    init() {
        console.log('Goals module placeholder loaded.');
        // Set up events to add/remove and complete goals
        // Recompute progress calculations
          openGoalsBtn.addEventListener("click",function(){
            goalsSection.classList.add("active");
            dashboardSection.classList.remove("active");
            
        });
         goalsBackBtn.addEventListener("click",function(){
        goalsSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });
    }
};
