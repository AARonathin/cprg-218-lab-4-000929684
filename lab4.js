document.addEventListener('DOMContentLoaded', function() {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
});
document.getElementById('year').textContent = new Date().getFullYear();

// Get the current date
const today = new Date();
// Format the date as YYYY-MM-DD
const formattedDate = today.toISOString().split('T')[0];


// Your NASA API key
const apiKey = '1t1z9mKYxgafOVJjT4Rd9WZeH5hDTFCFGMmxbZYP';

// The APOD API URL
const url = new URL('https://api.nasa.gov/planetary/apod');

// Parameters for the API request
const params = {
    api_key: apiKey,
    date: formattedDate // Use the current date
};

// Append the search parameters to the URL
Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

// Make the request to the APOD API
fetch(url)
.then(response => {
    if (!response.ok) {
        throw new Error(`Failed to retrieve data: ${response.status}`);
    }
    return response.json(); // Convert the response body to JSON
})
.then(data => {
    console.log('Title:', data.title);
    console.log('Date:', data.date);
    console.log('Explanation:', data.explanation);
    console.log('Image URL:', data.url);
    console.log( 'copyright:', data.copyright);

    // Set the background image of the accordion container
    const accordionContainer = document.querySelector('.accordion-container');
    accordionContainer.style.backgroundImage = `url('${data.url}')`;
    accordionContainer.style.backgroundSize = 'cover'; // Ensure the image covers the full container
    accordionContainer.style.backgroundPosition = 'center'; // Center the background image
})
.catch(error => console.error('Error:', error));

