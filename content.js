const extractProductInfo = () => {
  const site = window.location.hostname;

  let productTitle = "Unknown Product";
  let productPrice = "No price found";

  if (site.includes("amazon.com")) {
    productTitle = document.getElementById("productTitle")?.innerText.trim() || productTitle;
    productPrice = document.querySelector(".a-price .a-offscreen")?.innerText.trim() || productPrice;
  } else if (site.includes("ebay.com")) {
    productTitle = document.querySelector("#itemTitle")?.innerText.trim() || productTitle;
    productPrice = document.querySelector(".notranslate .display-price")?.innerText.trim() || productPrice;
  } else if (site.includes("walmart.com")) {
    productTitle = document.querySelector("h1.prod-ProductTitle")?.innerText.trim() || productTitle;
    productPrice = document.querySelector(".price-characteristic")?.innerText.trim() || productPrice;
  } else if (site.includes("target.com")) {
    productTitle = document.querySelector("h1[data-test='product-title']")?.innerText.trim() || productTitle;
    productPrice = document.querySelector("div[data-test='product-price']")?.innerText.trim() || productPrice;
  } else if (site.includes("bestbuy.com")) {
    productTitle = document.querySelector(".sku-title h1")?.innerText.trim() || productTitle;
    productPrice = document.querySelector(".priceView-hero-price span")?.innerText.trim() || productPrice;
  } else if (site.includes("aliexpress.com")) {
    productTitle = document.querySelector(".product-title-text")?.innerText.trim() || productTitle;
    productPrice = document.querySelector(".product-price-value")?.innerText.trim() || productPrice;
  } else if (site.includes("flipkart.com")) {
    productTitle = document.querySelector(".B_NuCI")?.innerText.trim() || productTitle;
    productPrice = document.querySelector("._30jeq3")?.innerText.trim() || productPrice;
  }

  console.log("Extracted Product Info:", productTitle, productPrice);

  return { productTitle, productPrice };
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "price_check") {
    const { productTitle, productPrice } = extractProductInfo();
    console.log("Sending response to popup:", `Product: ${productTitle}, Price: ${productPrice}`);
    sendResponse(`Product: ${productTitle}, Price: ${productPrice}`);
  }
});
