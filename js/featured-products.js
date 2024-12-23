// featured-products.js

document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.querySelector('.featured-products .product-grid');
  
    // Fetch featured products data from JSON file
    fetch('data/featured-products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(featuredProducts => {
        renderFeaturedProducts(featuredProducts);
      })
      .catch(error => {
        console.error('Error fetching featured products:', error);
        featuredGrid.innerHTML = '<p>Unable to load featured products at this time.</p>';
      });
  
    function renderFeaturedProducts(products) {
      featuredGrid.innerHTML = ''; // Clear existing content
  
      products.forEach(product => {
        const productCard = document.createElement('article');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <a href="product-detail.html?id=${product.id}" class="btn btn--link">View Product</a>
        `;
        featuredGrid.appendChild(productCard);
      });
    }
  });
  