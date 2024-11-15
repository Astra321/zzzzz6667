
// Example products data (replace with Firestore or dynamic data later)
const products = [
  { name: 'Dell XPS 13', price: 1199, image: 'images/dell-xps.jpg' },
  { name: 'MacBook Air M2', price: 1099, image: 'images/macbook-air.jpg' },
  { name: 'iPhone 14 Pro', price: 999, image: 'images/iphone-14.jpg' },
  { name: 'Samsung Galaxy S23', price: 899, image: 'images/galaxy-s23.jpg' }
];

// Render the products
const renderProducts = (filteredProducts) => {
  const productContainer = document.getElementById('product-list');
  productContainer.innerHTML = ''; // Clear existing products

  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
  });
};

// Filter products based on search input
document.getElementById('search-input').addEventListener('input', (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery)
  );
  renderProducts(filteredProducts);
});

// Initial render of all products
renderProducts(products);
