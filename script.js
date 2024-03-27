const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}
function renderCart() {
  cartList.innerHTML = "";
  cartItems.forEach((cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${cartItem.name} - $${cartItem.price}`;
    cartList.appendChild(li);
  });
}
let cartItems = [];
function addToCart(productId) {
  const productToAdd = products.find(product => product.id === productId);
  cartItems.push(productToAdd);
  renderCart();
  updateSessionStorage();
}
function removeFromCart(productId) {
  const index = cartItems.findIndex(item => item.id === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCart();
    updateSessionStorage();
  }
}
function clearCart() {
  cartItems = [];
  renderCart();
  updateSessionStorage();
}
function updateSessionStorage() {
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
}
renderProducts();
window.onload = function() {
  const storedCartItems = sessionStorage.getItem('cartItems');
  if (storedCartItems) {
    cartItems = JSON.parse(storedCartItems);
    renderCart();
  }
};
productList.addEventListener("click", function(event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});
clearCartButton.addEventListener("click", clearCart);
