// main.js

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.header__nav ul');

  // Function to open the menu
  const openMenu = () => {
      navMenu.classList.add('show');
      navToggle.classList.add('active'); // Optional: To animate the toggle icon
      navToggle.setAttribute('aria-expanded', 'true'); // Update ARIA attribute

      // Add event listeners for closing the menu
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
  };

  // Function to close the menu
  const closeMenu = () => {
      navMenu.classList.remove('show');
      navToggle.classList.remove('active'); // Optional: To animate the toggle icon
      navToggle.setAttribute('aria-expanded', 'false'); // Update ARIA attribute

      // Remove event listeners for closing the menu
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
  };

  // Toggle menu on click
  navToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the click from propagating to the document
      if (navMenu.classList.contains('show')) {
          closeMenu();
      } else {
          openMenu();
      }
  });

  // Close the menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
          closeMenu();
      });
  });

  // Function to handle clicks outside the menu
  const handleClickOutside = (e) => {
      // Check if the click target is not within the navMenu or navToggle
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          closeMenu();
      }
  };

  // Function to handle keyboard events
  const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
          closeMenu();
      }
  };

  // Optional: Handle keyboard navigation within the menu
  // This traps the focus within the menu when it's open
  navMenu.addEventListener('keydown', (e) => {
      const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
          if (e.shiftKey) { // Shift + Tab
              if (document.activeElement === firstElement) {
                  e.preventDefault();
                  lastElement.focus();
              }
          } else { // Tab
              if (document.activeElement === lastElement) {
                  e.preventDefault();
                  firstElement.focus();
              }
          }
      }
  });
});
