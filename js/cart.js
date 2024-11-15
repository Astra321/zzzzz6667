
const firebaseConfig = {
  apiKey: "AIzaSyAHwQdpTQ-xzhpl63yapaUfmxUy0mBpAAs",
  authDomain: "zizo2-dbd4e.firebaseapp.com",
  projectId: "zizo2-dbd4e",
  storageBucket: "zizo2-dbd4e.firebasestorage.app",
  messagingSenderId: "1087993545163",
  appId: "1:1087993545163:web:78c4bcb27c1b22ef6af64e",
  measurementId: "G-W1JS7BWN5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Load the cart from Firestore
const loadCart = async () => {
  const userID = localStorage.getItem("userID");
  if (!userID) {
    alert("Please log in to view your cart.");
    window.location.href = "login.html";
    return;
  }

  const cartDoc = doc(db, "carts", userID);
  const cartSnapshot = await getDoc(cartDoc);

  if (cartSnapshot.exists()) {
    const cartData = cartSnapshot.data().items || [];
    localStorage.setItem("cart", JSON.stringify(cartData));
    renderCart(cartData);
  } else {
    console.log("No cart found for user.");
    renderCart([]);
  }
};

// Save the cart to Firestore
const saveCart = async () => {
  const userID = localStorage.getItem("userID");
  if (!userID) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  await setDoc(doc(db, "carts", userID), { items: cart });
  console.log("Cart saved to Firestore.");
};

// Render cart items on the page
const renderCart = (cart) => {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button class="remove-from-cart" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);

  // Add remove functionality
  document.querySelectorAll(".remove-from-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      removeFromCart(index);
    });
  });
};

// Remove an item from the cart
const removeFromCart = (index) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(cart);
};

// Load cart when the page is loaded
loadCart();
