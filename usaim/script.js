const products = [
  { name: "Swirl Pink Design", price: 1500, img: "1.jpg" },
  { name: "Rainbow Shine", price: 1800, img: "2.jpg" },
  { name: "Golden Touch", price: 1700, img: "3.jpg" },
  { name: "Minty Fresh", price: 2000, img: "4.jpg" },
  { name: "Lavender Love", price: 1600, img: "5.jpg" },
  { name: "Sunset Orange", price: 1400, img: "6.jpg" },
  { name: "Classy Nude", price: 1300, img: "7.jpg" },
  { name: "Purple Dream", price: 1900, img: "8.jpg" },
  { name: "French White", price: 1700, img: "9.jpg" },
  { name: "Black Gloss", price: 1200, img: "10.jpg" },
  { name: "Candy Tips", price: 1600, img: "11.jpg" },
  { name: "Rose Sparkle", price: 2000, img: "12.jpg" },
  { name: "Ocean Blue", price: 1500, img: "13.jpg" },
  { name: "Peach Gloss", price: 1400, img: "14.jpg" },
  { name: "Chrome Silver", price: 1750, img: "1.jpg" }
];

const productsContainer = document.getElementById("products");
const cartItemsList = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const placeOrderBtn = document.getElementById("place-order");

let cart = [];

function displayProducts() {
  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₨${product.price}</p>
      <button class="add-to-cart" data-index="${index}">Add to Cart</button>
    `;
    productsContainer.appendChild(div);
  });
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₨${item.price}
      <button data-index="${idx}">Remove</button>
    `;
    cartItemsList.appendChild(li);
  });
  cartTotalSpan.textContent = total;
  placeOrderBtn.disabled = cart.length === 0;
}

productsContainer.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const index = +e.target.dataset.index;
    cart.push(products[index]);
    updateCart();
  }
});

cartItemsList.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const index = +e.target.dataset.index;
    cart.splice(index, 1);
    updateCart();
  }
});

placeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const items = cart.map(item => item.name).join(", ");

  const method = confirm(`Your order for: ${items}\nTotal: ₨${total}\n\nClick OK for Online Transfer, Cancel for Cash on Delivery`);

  let message = `🛍️ Order Summary:\n\nItems: ${items}\nTotal: ₨${total}\n`;

  if (method) {
    message += `\n💳 *Online Transfer Details:*\nSend to: 03242788466\nAccount: Jahangir (JazzCash)\n`;
  } else {
    message += `\n💵 Payment Method: Cash on Delivery`;
  }

  message += `\n\n📲 Please take a screenshot and send to WhatsApp: 03242788466`;

  alert(message);

  cart = [];
  updateCart();
});

// ===== Slider =====
const slides = document.querySelectorAll(".carousel-slide");
const nav = document.querySelector(".carousel-nav");
let currentSlide = 0;

function createNavButtons() {
  slides.forEach((_, i) => {
    const btn = document.createElement("button");
    if (i === 0) btn.classList.add("active");
    btn.addEventListener("click", () => goToSlide(i));
    nav.appendChild(btn);
  });
}

function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  nav.children[currentSlide].classList.remove("active");
  currentSlide = n;
  slides[currentSlide].classList.add("active");
  nav.children[currentSlide].classList.add("active");
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

createNavButtons();
setInterval(nextSlide, 4000);
displayProducts();
updateCart();
