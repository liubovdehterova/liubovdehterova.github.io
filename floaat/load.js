let index = 0;
function loadData() {
    let n = index += 1;
    const loadImd = document.querySelectorAll('.preloader__img');
    const preloaderEl = document.getElementById('preloader');
    let i;
    if (n > loadImd.length) {
        index = 1
    }
    if (n < 1) {
        index = loadImd.length
    }
    for (i = 0; i < loadImd.length; i++) {
        loadImd[i].classList.remove('active');
    }
    if(preloaderEl.classList.contains('visible')) {
        loadImd[index - 1].classList.add('active');
    }
    preloaderEl.classList.add('hidden');
    preloaderEl.classList.remove('visible');
}



window.addEventListener('load', () => {
    setInterval(() => {
        loadData();
    }, 100);
});