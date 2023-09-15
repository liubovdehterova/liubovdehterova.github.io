const toggleBtn = document.querySelector('.header__toggle-menu');

function hideMenu() {
    const mobMenu = document.querySelector('.nav');
    mobMenu.classList.toggle('active');
    toggleBtn.classList.toggle('close');
}

toggleBtn.addEventListener('click', hideMenu);