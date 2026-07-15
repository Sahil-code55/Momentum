
const openPomodoroBtn = document.getElementById("openPomodoroBtn");
const pomodoroSection = document.getElementById("pomodoro-section");
const pomodoroBackBtn = document.getElementById("pomodoroBackBtn");


const timerModule = {
   
    timer: {
    mode: "focus",
    durations: {
        focus: 25,
        short: 5,
        long: 15
    },
    labels: {
        focus: "Work Session",
        short: "Short Break",
        long: "Long Break"
    },

    timeLeft: 25 * 60,
    isRunning: false,
    intervalId: null
},
    
    init() {

     
        this.modeBtns = document.querySelectorAll(".mode-btn");
        this.timerDisplay = document.getElementById("timerDisplay");
        this.sessionLabel = document.getElementById("sessionLabel");
        this.startBtn = document.getElementById("timerStartBtn");
        this.pauseBtn = document.getElementById("timerPauseBtn");
        this.resetBtn = document.getElementById("timerResetBtn");
        this.pomodoroMode = document.getElementById("pomodoroMode");
        this.pomodoroRemaining = document.getElementById("pomodoroRemaining");

        this.loadTimer()
      //Restore UI
    this.sessionLabel.textContent = this.timer.labels[this.timer.mode];

this.updateDisplay();

this.modeBtns.forEach((btn) => {
    btn.classList.remove("active");

    if (btn.dataset.mode === this.timer.mode) {
        btn.classList.add("active");
    }
});

    // =====start , pause , reset button===//
    
        this.startBtn.addEventListener("click", () => {
        this.startTimer();
    });

        this.pauseBtn.addEventListener("click", () => {
        this.pauseTimer();
    });

        this.resetBtn.addEventListener("click", () => {
        this.resetTimer();
    });


        //=========== feature button section==============//
      this.modeBtns.forEach((button) => {
      button.addEventListener("click", () => {

        this.modeBtns.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        this.changeMode(button.dataset.mode);

    });
});


// ============================open & close pomodoro Timer dashboard=====================//
         openPomodoroBtn.addEventListener("click",function(){
            pomodoroSection.classList.add("active");
            dashboardSection.classList.remove("active");
            
        });
         pomodoroBackBtn.addEventListener("click",function(){
        pomodoroSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });
    this.updateDisplay();
    },
      //===================== Start Countdown Timer==============//
    startTimer() {
    // Prevent multiple intervals
    if (this.timer.isRunning) return;

    // Timer is now running
    this.timer.isRunning = true;
    this.saveTimer(); 

    // start countdown
    this.timer.intervalId = setInterval(()=>{
    this.timer.timeLeft--;
if (this.timer.timeLeft <= 0) {
    this.timer.timeLeft = 0;
    this.updateDisplay();
    clearInterval(this.timer.intervalId);
    this.timer.isRunning = false;
    this.saveTimer(); 
    alert(`⏰ Time's Up!\n\n${this.timer.labels[this.timer.mode]} has ended.`);
    return;
}

this.updateDisplay();
this.saveTimer();
      },1000);

    },
    //======================pause time feature==============//
    pauseTimer() {
        // Pause Countdown Timer
        clearInterval(this.timer.intervalId);
         this.timer.isRunning = false;
         this.saveTimer(); 
       
    return;


    },
    //===================reset time ====================//
    resetTimer() {
        clearInterval(this.timer.intervalId);
        this.timer.isRunning = false;
        this.timer.timeLeft = this.timer.durations[this.timer.mode] * 60;
        this.updateDisplay();
        this.saveTimer(); 
    },

    // =============change modes======================//
    changeMode(mode){
    this.timer.mode = mode;
    this.timer.timeLeft = this.timer.durations[mode] * 60;
    this.sessionLabel.textContent = this.timer.labels[mode];
    this.updateDisplay();
    this.saveTimer(); 
    },

    // ================updateDisplay==================//
    updateDisplay(){
        const minutes = Math.floor(this.timer.timeLeft / 60);
        const seconds = this.timer.timeLeft % 60;
        const formattedMinutes =String(minutes).padStart(2, "0");
        const formattedSeconds =String(seconds).padStart(2, "0");
        this.timerDisplay.textContent =`${formattedMinutes}:${formattedSeconds}`;
            this.updateDashboardCard();
    },
    // =================saveTimer======================//
    saveTimer() {
    storageModule.save("Timer", {
        mode: this.timer.mode,
        timeLeft: this.timer.timeLeft
    });
},
     // ================LoadTimer======================//
loadTimer() {
    const loadingTimer = storageModule.load("Timer");
    if (!loadingTimer) return;

    this.timer.mode = loadingTimer.mode;
    this.timer.timeLeft = loadingTimer.timeLeft;

    // Fresh runtime state
    this.timer.isRunning = false;
    this.timer.intervalId = null;
},

// =================update Dashboard====================//
updateDashboardCard() {
    this.pomodoroMode.textContent =
    this.timer.labels[this.timer.mode];

    const minutes = Math.floor(this.timer.timeLeft / 60);
    const seconds = this.timer.timeLeft % 60;

    this.pomodoroRemaining.textContent =`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")} Remaining`;

}
    };
   

