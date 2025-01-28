document.getElementById("search-btn").addEventListener("click", async () => {
  const query = document.getElementById("product-search").value;
  if (!query) return;

  // Show loading indicator
  document.getElementById("loading").style.display = "block";
  document.getElementById("result").innerHTML = "";

  try {
    const prices = await fetchPrices(query);
    document.getElementById("loading").style.display = "none";

    if (prices.length > 0) {
      displayResults(prices);
    } else {
      document.getElementById("result").innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    document.getElementById("loading").style.display = "none";
    document.getElementById("result").innerHTML = "<p>Error fetching prices. Please try again.</p>";
  }
});

// Function to fetch prices using SerpAPI
async function fetchPrices(query) {
  const apiKey = 'fa6a4af9abc8a3a5da6cac469894cd004f7de1d814127f5fa34c3ad8b63f46b0'; // Replace with your SerpAPI key
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&tbm=shop&api_key=${apiKey}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data.shopping_results) return [];

  return data.shopping_results.map(result => ({
    store: result.source,
    price: result.price,
    image: result.thumbnail,
    link: result.link
  }));
}

// Function to display price comparison results
function displayResults(prices) {
  const resultContainer = document.getElementById("result");

  prices.forEach(price => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const cardContent = `
      <div>
        <img src="${price.image}" alt="${price.store}">
      </div>
      <div>
        <div class="store">${price.store}</div>
        <div class="price">${price.price}</div>
        <a href="${price.link}" target="_blank">View Product</a>
      </div>
    `;
    
    card.innerHTML = cardContent;
    resultContainer.appendChild(card);
  });
}

// popup.js

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn");

  searchButton.addEventListener("click", (event) => {
    // Add a "ripple effect" on button click
    createRippleEffect(event, searchButton);
    
    // Simulate loading the product search
    document.getElementById("loading").style.display = "block";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      // After loading, show results (mocked)
      document.getElementById("result").innerHTML = "Results are displayed here...";
    }, 1500); // Simulate loading time (1.5s)
  });
});

function createRippleEffect(event, button) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove(); // Remove ripple after animation
  }, 600); // 0.6s duration of ripple effect
}

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-btn");

  searchButton.addEventListener("click", () => {
    // Add a "ripple effect" on button click
    createRippleEffect(searchButton);
    
    // Simulate loading the product search
    document.getElementById("loading").style.display = "block";
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      // After loading, show results (mocked)
      document.getElementById("result").innerHTML = "Results are displayed here...";
    }, 1500); // Simulate loading time (1.5s)
  });
});

function createRippleEffect(button) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove(); // Remove ripple after animation
  }, 600); // 0.6s duration of ripple effect
}

