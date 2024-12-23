// products.js

const productGrid = document.getElementById('product-grid');
const applyFiltersBtn = document.getElementById('apply-filters-btn');
const filtersForm = document.getElementById('filters-form');
const sortSelect = document.getElementById('sort-select');

let productsData = [];

// Fetch product data from JSON file
fetch('data/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    productsData = data;
    renderProducts(productsData);
  })
  .catch(error => {
    console.error('Error fetching product data:', error);
    productGrid.innerHTML = '<p>Unable to load products at this time.</p>';
  });

// Event Listener for Apply Filters button
applyFiltersBtn.addEventListener('click', () => {
  applyFilters();
});

function applyFilters() {
  const checkedCategories = Array.from(filtersForm.querySelectorAll('input[name="category"]:checked'))
    .map(checkbox => checkbox.value);

  const sortOption = sortSelect.value;

  let filteredProducts = [...productsData];

  // Filter by category if any category is selected
  if (checkedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => checkedCategories.includes(product.category));
  }

  // Sort by price if needed
  if (sortOption === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Re-render the product grid
  renderProducts(filteredProducts);
}

function renderProducts(products) {
  productGrid.innerHTML = ''; // Clear existing products
  if (products.length === 0) {
    productGrid.innerHTML = '<p>No products match your filters.</p>';
    return;
  }

  products.forEach(product => {
    const productCard = document.createElement('article');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <a href="product-detail.html?id=${product.id}" class="btn btn--link">View Product</a>
    `;
    productGrid.appendChild(productCard);
  });
}
