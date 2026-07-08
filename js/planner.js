/**
 * FocusHub - Daily Planner Module
 * 
 * Manages daily hourly slots (08:00 AM - 10:00 PM).
 * Saves hourly updates from textarea inputs to storage.
 */
const plannerSection = document.getElementById("planner-section");
const plannerBackBtn = document.getElementById("plannerBackBtn");


const plannerModule = {
    // Selectors:
    // Slots: textareas inside class="planner-slot"
    
    init() {
        console.log('Planner module placeholder loaded.');
        // Load existing plan events into textareas
        // Autosave content as the user types

     openPlannerBtn.addEventListener("click",function(){
            plannerSection.classList.add("active");
            dashboardSection.classList.remove("active");
            
        });
         plannerBackBtn.addEventListener("click",function(){
        plannerSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });
    }
};
