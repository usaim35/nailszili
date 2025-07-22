const products = [];
for (let i = 1; i <= 14; i++) {
  products.push({
    name: `Design ${i}`,
    price: 1400 + (i * 50),
    img: `${i}.jpg`
  });
}

// Product 15 uses image 7.jpg instead of 15.jpg
products.push({
  name: "Design 15",
  price: 1400 + (15 * 50),
  img: "7.jpg"
});

// Product 16 uses image 1.jpg
products.push({
  name: "Design 16",
  price: 1400 + (16 * 50),
  img: "1.jpg"
});

const productsContainer = document.getElementById("products");
const cartItemsList = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const placeOrderBtn = document.getElementById("place-order");

let cart = [];

function displayProducts() {
  productsContainer.innerHTML = "";  // Clear previous products

  products.forEach((product, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="product shadow-sm rounded p-3">
        <img src="${product.img}" alt="${product.name}" loading="lazy" class="img-fluid mb-2" />
        <h3 class="fs-6">${product.name}</h3>
        <p class="fw-bold">₨${product.price}</p>
        <button class="btn btn-mint w-100 add-to-cart" data-index="${index}">Add to Cart</button>
      </div>
    `;
    productsContainer.appendChild(col);
  });
}

function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${item.name} - ₨${item.price} 
      <button class="btn btn-sm btn-danger" data-index="${idx}">Remove</button>
    `;
    cartItemsList.appendChild(li);
  });
  cartTotalSpan.textContent = total;
  placeOrderBtn.disabled = cart.length === 0;
}

productsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const index = +e.target.dataset.index;
    cart.push(products[index]);
    updateCart();
  }
});

cartItemsList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = +e.target.dataset.index;
    cart.splice(index, 1);
    updateCart();
  }
});

placeOrderBtn.addEventListener("click", () => {
  const orderList = cart.map(item => item.name).join(", ");
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const method = prompt(`Your order is: ${orderList}\nTotal: ₨${total}\n\nType "1" for Cash on Delivery or "2" for Online Transfer:`);

  if (method === "1") {
    alert(`✅ COD Order placed!\nTotal: ₨${total}\nOrder: ${orderList}\n\n📸 Take screenshot & send to WhatsApp: 0324 2788466`);
  } else if (method === "2") {
    alert(`✅ Online Order placed!\nTotal: ₨${total}\nOrder: ${orderList}\n\n📲 Send payment to: 0324 2788466 (JazzCash - Jahangir)\nThen WhatsApp screenshot.`);
  } else {
    alert("Order cancelled. Please try again.");
    return;
  }

  cart = [];
  updateCart();
});

displayProducts();
updateCart();
