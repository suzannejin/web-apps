const newQuoteButton = document.querySelector('#js-new-quote');
newQuoteButton.addEventListener('click', getQuote);
const spinner = document.querySelector('#js-spinner');
const twitterButton = document.querySelector('#js-tweet');

const endpoint = 'https://api.quotable.io/random';

async function getQuote() {
    spinner.classList.remove('hidden');
    newQuoteButton.disabled = true;

    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw Error(response.statusText)
      }
  
      const json = await response.json();
      displayQuote(json.content, json.author);
      setTweetButton(json.content, json.author);

    } catch (err) {
      console.log(err)
      alert('Failed to fetch new quote');
    }
    finally {
        newQuoteButton.disabled = false;
        spinner.classList.add('hidden');
    }
}

function displayQuote(quote, cite) {
    const quoteText = document.querySelector('#js-quote-text');
    const quoteCite = document.querySelector('#js-quote-cite');
    quoteText.textContent = quote;
    quoteCite.textContent = cite;
}

function setTweetButton(quote, cite) {
    twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote} - ${cite}`);
}

getQuote();