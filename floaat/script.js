const cursorPointed = document.querySelector('.pointed');
const cursorRounded = document.querySelector('.rounded');
const headerLogo = document.querySelector('.header__top__logo--pointer');
const headerTopContactsLink = document.querySelectorAll('.header__top__contacts__link');
const headerTopContactsLinkDot = document.querySelectorAll('.header__top__contacts__dot');
const headerMainText = document.querySelector('.header__main__text__animation');
const clientsCard = document.querySelectorAll('.clients__info__main__card');
const menuMainItemBlocks = document.querySelector('.menu__main__item__flex');
const menuMainItemBlocksInner = document.querySelectorAll('.menu__main__item__inner__blocks');
const menuMainItem = document.querySelectorAll('.menu__main__item__inner');
const sliderItem = document.querySelectorAll('.slider-item');
const footerContact = document.querySelector('.footer__contact');


const moveCursor = (e) => {
    const mouseY = e.pageY;
    const mouseX = e.pageX;
    cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
}
document.body.addEventListener('mousemove', moveCursor);

function addClassPointerLogo(e) {
    if (e.type === 'mouseover') {
        cursorPointed.classList.add('pointer__logo');
        cursorRounded.classList.add('rounded__logo');
    } else if (e.type === 'mouseout') {
        cursorPointed.classList.remove('pointer__logo');
        cursorRounded.classList.remove('rounded__logo');
    }
}

headerLogo.onmouseover = headerLogo.onmouseout = addClassPointerLogo;
footerContact.onmouseover = footerContact.onmouseout = addClassPointerLogo;
menuMainItem.forEach((e) => {
    e.onmouseover = e.onmouseout = addClassPointerLogo;
})
clientsCard.forEach((e) => {
    e.onmouseover = e.onmouseout = addClassPointerLogo;
});
sliderItem.forEach((e) => {
    e.onmouseover = e.onmouseout = addClassPointerLogo;
});

function addClassPointerContacts(e) {
    if (e.type === 'mouseover') {
        cursorPointed.classList.add('pointer__contacts');
        cursorRounded.classList.add('rounded__contacts');
    } else if (e.type === 'mouseout') {
        cursorPointed.classList.remove('pointer__contacts');
        cursorRounded.classList.remove('rounded__contacts');
    }
}

headerTopContactsLink.forEach((e) => {
    e.onmouseover = e.onmouseout = addClassPointerContacts;
});

function addClassPointerDot(e) {
    if (e.type === 'mouseover') {
        cursorPointed.classList.add('pointer__dot');
        cursorRounded.classList.add('rounded__contacts');

    } else if (e.type === 'mouseout') {
        cursorPointed.classList.remove('pointer__dot');
        cursorRounded.classList.remove('rounded__contacts');
    }
}

headerTopContactsLinkDot.forEach((e) => {
    e.onmouseover = e.onmouseout = addClassPointerDot;
});


function headerMainTextAnimation(e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let halfWidth = window.innerWidth / 2;
    let halfHeight = window.innerHeight / 2;
    let xdeg = (mouseX - halfWidth) / halfWidth;
    let ydeg = (mouseY - halfHeight) / halfHeight;
    headerMainText.style.transform = `rotateX(${ydeg * 10}deg) rotateY(${xdeg * 10}deg)`;
}

window.addEventListener("mousemove", headerMainTextAnimation);

(function () {
    let controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0
        }
    });


    let panels = document.querySelectorAll('.panel');

    for (let panel of panels) {

        let scene = new ScrollMagic.Scene({
            triggerElement: panel
        })
            .addIndicators()
            .on('progress')
            .setPin(panel)
            .addTo(controller);
    }
})();

function menuMainItemBlocksEdition(e) {
    const gear = document.querySelector('.menu__main__item__information__inner.gear');
    const star = document.querySelector('.menu__main__item__information__inner.star');
    const graphik = document.querySelector('.menu__main__item__information__inner.graphik');
    const claqueta = document.querySelector('.menu__main__item__information__inner.claqueta-menu');
    const lupa = document.querySelector('.menu__main__item__information__inner.lupa');
    const headphone = document.querySelector('.menu__main__item__information__inner.headphone-menu');

    menuMainItemBlocksInner.forEach(e => {
        e.classList.remove('active');
    });
    switch (e.target.getAttribute('title')) {
        case 'gear':
            star.classList.remove('block__active');
            graphik.classList.remove('block__active');
            claqueta.classList.remove('block__active');
            lupa.classList.remove('block__active');
            headphone.classList.remove('block__active');
            gear.classList.add('block__active');
            break;
        case 'star':
            gear.classList.remove('block__active');
            graphik.classList.remove('block__active');
            claqueta.classList.remove('block__active');
            lupa.classList.remove('block__active');
            headphone.classList.remove('block__active');
            star.classList.add('block__active');
            break;
        case 'graphik':
            gear.classList.remove('block__active');
            star.classList.remove('block__active');
            claqueta.classList.remove('block__active');
            lupa.classList.remove('block__active');
            headphone.classList.remove('block__active');
            graphik.classList.add('block__active');
            break;
        case 'claqueta-menu':
            gear.classList.remove('block__active');
            star.classList.remove('block__active');
            graphik.classList.remove('block__active');
            lupa.classList.remove('block__active');
            headphone.classList.remove('block__active');
            claqueta.classList.add('block__active');
            break;
        case 'lupa':
            gear.classList.remove('block__active');
            star.classList.remove('block__active');
            graphik.classList.remove('block__active');
            claqueta.classList.remove('block__active');
            headphone.classList.remove('block__active');
            lupa.classList.add('block__active');
            break;
        case 'headphone-menu':
            gear.classList.remove('block__active');
            star.classList.remove('block__active');
            graphik.classList.remove('block__active');
            claqueta.classList.remove('block__active');
            lupa.classList.remove('block__active');
            headphone.classList.add('block__active');
            break;
    }
    e.target.classList.add('active');
}

menuMainItemBlocks.addEventListener('click', menuMainItemBlocksEdition);

// Slider Our Team
let prev = document.getElementById("arrow-left"),
    next = document.getElementById("arrow-right"),
    sliderImg = document.getElementById("slider-img"),
    imgItem = document.querySelectorAll('.slider-item'),
    left = 0,
    imgWidth = imgItem[0].clientWidth + 10,
    maxWidthImg = 0;
imgItem.forEach((e) => {
    maxWidthImg += e.clientWidth + 10;
});
sliderImg.style.left = left + 'px';
slideTo = (direction) => {
    let count = 0;
    if (document.body.clientWidth < 1246 && document.body.clientWidth > 996) {
        count = 3;
    } else if (document.body.clientWidth < 996 && document.body.clientWidth > 737) {
        count = 2;
    } else if (document.body.clientWidth <= 737) {
        count = 1;
    } else {
        count = 4;
    }
    if (direction === "left") left += imgWidth;
    if (direction === "right") left -= imgWidth;
    if (left < -maxWidthImg + imgWidth * count) left = 0;
    if (left > 0) left = -maxWidthImg + imgWidth * count;

    sliderImg.style.left = left + 'px';
}

prev.addEventListener("click", () => {
    slideTo('left');
});

next.addEventListener("click", () => {
    slideTo('right');
});