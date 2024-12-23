// product-detail.js

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || "truffles"; // Default to "truffles" if no ID provided

  // Fetch product data from JSON file
  fetch('data/product-details.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(productsData => {
      const product = productsData[productId];
      if (!product) {
        document.querySelector('.product-detail__container').innerHTML = "<p>Product not found.</p>";
        return;
      }
      populateProductDetail(product);
    })
    .catch(error => {
      console.error("Error fetching product data:", error);
      document.querySelector('.product-detail__container').innerHTML = "<p>Unable to load product data.</p>";
    });

  function populateProductDetail(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;

    const flavorNotesContainer = document.getElementById('flavor-notes');
    flavorNotesContainer.innerHTML = '';
    product.flavorNotes.forEach(note => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fas fa-caret-right"></i> ${note}`;
      flavorNotesContainer.appendChild(li);
    });

    const mainImage = document.getElementById('main-image');
    mainImage.src = product.mainImage + "?auto=format&fit=crop&w=600&q=80";
    mainImage.alt = product.name;

    const thumbsContainer = document.getElementById('thumbs-container');
    thumbsContainer.innerHTML = '';
    product.thumbnails.forEach((thumbUrl, idx) => {
      const thumbImg = document.createElement('img');
      thumbImg.src = thumbUrl + "?auto=format&fit=crop&w=200&q=80";
      thumbImg.alt = `Thumbnail ${idx + 1}`;
      thumbImg.addEventListener('click', () => {
        mainImage.src = thumbImg.src.replace(/w=200/, "w=600"); // Load a larger image
      });
      thumbsContainer.appendChild(thumbImg);
    });

    // Nutrition
    const nutritionContent = document.getElementById('nutrition-content');
    nutritionContent.innerHTML = `
      <p><strong>Serving Size:</strong> ${product.nutrition.serving}</p>
      <p><strong>Calories:</strong> ${product.nutrition.calories}</p>
      <p><strong>Total Fat:</strong> ${product.nutrition.fat}</p>
      <p><strong>Sugars:</strong> ${product.nutrition.sugar}</p>
    `;

    // Reviews
    const reviewsContent = document.getElementById('reviews-content');
    reviewsContent.innerHTML = '';
    product.reviews.forEach(review => {
      const blockquote = document.createElement('blockquote');
      blockquote.innerHTML = `<p>"${review.comment}"</p><cite>– ${review.name}</cite>`;
      reviewsContent.appendChild(blockquote);
    });

    // Tab interaction (optional, as before)
    const tabButtons = document.querySelectorAll('.tabs button[role="tab"]');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(panel => panel.hidden = true);

        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const panelId = button.getAttribute('aria-controls');
        document.getElementById(panelId).hidden = false;
      });
    });
  }
});
