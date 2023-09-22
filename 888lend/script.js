const btnL = document.querySelector('.dropdown-toggle');
btnL.addEventListener('click', () => {
    const menuL = document.querySelector('.dropdown-menu');
    menuL.classList.toggle('show');
});
document.getElementById('copyButton').addEventListener('click', function () {
    const textToCopy = "8smirror-1m.com"; // Замініть це на той текст, який ви хочете скопіювати
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
});


document.addEventListener('DOMContentLoaded', function() {
    const instructionList = document.querySelector('.instruction__list');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let touchStartX = null;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = dots.length - 1;
        } else if (index >= dots.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const offset = -currentIndex * 226;
        instructionList.style.transform = `translateX(${offset}px)`;
        instructionList.style.transition = 'transform 0.3s ease-in-out';
        setActiveDot(currentIndex);
    }

    function setActiveDot(index) {
        dots.forEach(dot => dot.classList.remove('active-dot'));
        dots[index].classList.add('active-dot');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        if (touchStartX !== null) {
            const touchEndX = event.touches[0].clientX;

            const deltaX = touchEndX - touchStartX;

            if (deltaX < -10) {
                nextSlide();
                touchStartX = null;
            } else if (deltaX > 40) {
                prevSlide();
                touchStartX = null;
            }
        }
    }

    function handleTouchEnd() {
        touchStartX = null;
    }

    instructionList.addEventListener('touchstart', handleTouchStart);
    instructionList.addEventListener('touchmove', handleTouchMove);
    instructionList.addEventListener('touchend', handleTouchEnd);

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    showSlide(currentIndex);
});