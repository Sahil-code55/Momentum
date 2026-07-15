
const plannerSection = document.getElementById("planner-section");
const plannerBackBtn = document.getElementById("plannerBackBtn");


const plannerModule = {
  
     plannerData : {},
     saveTimer: null,

    init() {
        
    //    select all textarea
       this.textareas = document.querySelectorAll(".planner-textarea");
     
 //loadsavedata
     this.loadPlanner();
     this.highlightCurrentHour();

    this.textareas.forEach((textarea) => {
 
    const slot =  textarea.closest('.planner-slot');
    const time = slot.id.replace("slot-", "");
    textarea.value = this.plannerData[time] || "";
    });

    //================   Autosave ==================//
    this.textareas.forEach((textarea)=>{
              textarea.addEventListener("input", (e) => {
                const slot = e.target.closest(".planner-slot");
                const time = slot.id.replace("slot-", "");
                const text = e.target.value;
                this.plannerData[time] = text;
              clearTimeout(this.saveTimer);
              this.saveTimer = setTimeout(() => {
              this.savePlanner();
                this.highlightCurrentHour();

             
              }, 1000);
            });
    });
//===================opening & close feature=====================//
     openPlannerBtn.addEventListener("click",function(){
            plannerSection.classList.add("active");
            dashboardSection.classList.remove("active");
        });
         plannerBackBtn.addEventListener("click",function(){
        plannerSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });
        this.highlightCurrentHour();
    },

// ==========================save Planner logic====================//
        savePlanner() {
    storageModule.save("planner",this.plannerData);
    },
// =========================load planner logic ===================//
    loadPlanner() {
     const savedPlanner = storageModule.load("planner");

    if (savedPlanner) {
        this.plannerData = savedPlanner;
    }
    }
,

   // ===============highlight current hour dashboard ===========================//

highlightCurrentHour() {
const currentPlan = document.getElementById("currentPlan");
const nextPlan = document.getElementById("nextPlan");

const now = new Date();

const currentHour =String(now.getHours()).padStart(2, "0") + "00";

const currentSlot = document.getElementById(`slot-${currentHour}`);
if (currentSlot) {
 const time = currentSlot.querySelector(".planner-time").textContent;
const task = currentSlot.querySelector(".planner-textarea").value;
   if (task.trim() === "") {
        currentPlan.textContent = "Current: No Task";
    } else {
        currentPlan.textContent = `Current: ${time} - ${task}`;
    }

const times = Object.keys(this.plannerData).sort();


for (const time of times) {

    if (time > currentHour) {
        const task = this.plannerData[time];
         if (task.trim() === "") continue;
        const slot = document.getElementById(`slot-${time}`);
        const formattedTime = slot.querySelector(".planner-time").textContent;
        nextPlan.textContent =`Next: ${formattedTime} - ${task}`;
        break;

    }

}
}

}




};
