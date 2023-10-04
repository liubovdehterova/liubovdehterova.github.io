const burgerMenuBtn = document.querySelector(".header__burger-menu-btn");
const headerMenu = document.querySelector(".header__nav-menu");

window.addEventListener('resize', () => {
    if (window.matchMedia("(min-width: 769px)").matches) {
        headerMenu.classList.remove("hidden");
        burgerMenuBtn.classList.remove("opened");
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        headerMenu.classList.add("hidden");
        burgerMenuBtn.classList.remove("opened");
    } 
});

document.addEventListener('click', (e) => {
    if(burgerMenuBtn.contains(e.target)) {
        if(burgerMenuBtn.classList.contains("opened")) {
            burgerMenuBtn.classList.remove("opened");
            headerMenu.classList.add("hidden");      
        } else if (!burgerMenuBtn.classList.contains("opened")) {
            burgerMenuBtn.classList.add("opened");
            headerMenu.classList.remove("hidden");
        }
    } 
    if((!burgerMenuBtn.contains(e.target)) && burgerMenuBtn.classList.contains("opened")) {
        console.log("yes");
        burgerMenuBtn.classList.remove("opened");
        headerMenu.classList.add("hidden");
    }
})    