/**
 * FocusHub - Motivation Quotes Module
 * 
 * Fetches and stores daily motivation quotes.
 * Displays quotes in the dashboard header block and the quote detail section.
 */
const openQuotesBtn = document.getElementById("openQuotesBtn");
const quotesSection = document.getElementById("quotes-section");
const quotesBackBtn = document.getElementById("quotesBackBtn");
const quoteDisplay = document.querySelector('#quoteDisplay');
const quoteAuthorDisplay = document.querySelector('#quoteAuthor');
const newQuoteBtnDisplay = document.querySelector("#newQuoteBtn");

const quoteModule = {
    // Selectors:
    // Header Quote Box: #headerQuoteContainer
    // Main Section: #quoteContainer, #quoteDisplay, #quoteAuthor
    // Action Button: #newQuoteBtn
    
    init() {

    async function getQuote() {
  try{
     const response = await fetch("https://dummyjson.com/quotes/random");

        const data = await response.json();
        quoteDisplay.textContent = `"${data.quote}"`;
        quoteAuthorDisplay.textContent = `— ${data.author}`;
         }
  catch {

        quoteDisplay.textContent = "Unable to load quote.";
        quoteAuthorDisplay.textContent = "";
    }
  }

newQuoteBtnDisplay.addEventListener("click", getQuote)

 getQuote()












        console.log('Quotes module placeholder loaded.');
        // Bind new quote buttons and render a starting quote
          openQuotesBtn.addEventListener("click",function(){
            quotesSection.classList.add("active");
            dashboardSection.classList.remove("active");
            
        });
         quotesBackBtn.addEventListener("click",function(){
        quotesSection.classList.remove("active");
            dashboardSection.classList.add("active");
        });
    }
}
// ,
    // async fetchNewQuote() {
    //     // Fetch quote from quotes API
    //     // Update display text and author
    // }

