document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.header__nav ul');
  
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
      });
    }
});
  