
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
import { getFirestore, collection, getDocs } from "firebase/firestore";
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

const productContainer = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

let allProducts = []; // To store all products

// Fetch products from Firestore
const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  querySnapshot.forEach((doc) => {
    const products = doc.data().products;
    allProducts = allProducts.concat(products);
  });
  renderProducts(allProducts);
};

// Render products to the DOM
const renderProducts = (products) => {
  productContainer.innerHTML = ""; // Clear previous content
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.specifications}</p>
      <p>Price: $${product.price}</p>
    `;
    productCard.addEventListener("click", () => {
      localStorage.setItem("productDetails", JSON.stringify(product));
      window.location.href = "product-details.html";
    });
    productContainer.appendChild(productCard);
  });
};

// Search functionality
searchInput.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery)
  );
  renderProducts(filteredProducts);
});

// Sorting functionality
sortSelect.addEventListener("change", (e) => {
  const sortBy = e.target.value;
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    } else if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });
  renderProducts(sortedProducts);
});

// Fetch and display products on page load
fetchProducts();
