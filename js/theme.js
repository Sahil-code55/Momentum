
const themeModule = {

    
    init() {
         
      this.themeToggle = document.getElementById("themeToggle");
        this.loadTheme();
      this.themeToggle.addEventListener("change", () => {
      this.toggleTheme();
    
    });
    },
    
    toggleTheme() {
        if (this.themeToggle.checked) {
        document.body.classList.add("dark-theme");
        
    } else {
        document.body.classList.remove("dark-theme");

    }
      this.saveTheme();
    },

    saveTheme(){
   if (this.themeToggle.checked) {
        storageModule.save("theme", "dark");
    } else {
        storageModule.save("theme", "light");
    }
    },

    loadTheme(){
 const savedTheme = storageModule.load("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        this.themeToggle.checked = true;
    }
    else {

        document.body.classList.remove("dark-theme");
        this.themeToggle.checked = false;

    }
    }
};
