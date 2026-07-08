const greeting = document.getElementById('greeting')
const quote = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.querySelector(".btn-new-quote");
const widgetDay = document.querySelector("#widgetDay");
const widgetDate = document.querySelector("#widgetDate");


// ===================greeting===============//

function updateGreeting(){
  const hour = new Date().getHours();
  
  let message = ""

if(hour >= 5 && hour <= 12){
 message = "Good Morning ☀️";
}
else if (hour >=12 && hour < 17){
    message = "Good Afternoon 🌤️";
}
else if (hour >=17 && hour < 21){
      message = "Good Evening 🌇";
}
else{
        message = "Good Night 🌙";
}
greeting.textContent = message;
}


updateGreeting()



// ==========================Quote Functionality=====================//


async function getQuote() {
  try{
     const response = await fetch("https://dummyjson.com/quotes/random");

        const data = await response.json();
        quote.textContent = `"${data.quote}"`;
        quoteAuthor.textContent = `— ${data.author}`;
         }
  catch {

        quote.textContent = "Unable to load quote.";
        quoteAuthor.textContent = "";
    }
  }

newQuoteBtn.addEventListener("click", getQuote)

 getQuote()


// ======================Date & Time ====================//

function updateDateTime(){
    const now = new Date();
    
      const day = now.toLocaleDateString("en-US", {
        weekday: "long"
    });

    const date = now.toLocaleDateString("india",{
         weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const time = now.toLocaleTimeString("india",{
          hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    
    document.getElementById("navDate").textContent = date;
    document.getElementById("navTime").textContent = time;
    document.getElementById("widgetTime").textContent = time ;
    document.getElementById("widgetDay").textContent = day ;
    widgetDate.textContent =date

}

updateDateTime();
setInterval(updateDateTime, 1000);



