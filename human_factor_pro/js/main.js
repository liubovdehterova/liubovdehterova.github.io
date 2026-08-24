document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
    initScrollReveal();
    initActiveNav();
    initSmoothScroll();
    initContactModal();
    initBackToTop();
});

function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav--open');
        burger.classList.toggle('burger--active', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
        if (!document.getElementById('contact-modal')?.classList.contains('is-open')) {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    });

    nav.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
            burger.classList.remove('burger--active');
            burger.setAttribute('aria-expanded', 'false');
            if (!document.getElementById('contact-modal')?.classList.contains('is-open')) {
                document.body.style.overflow = '';
            }
        });
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const groups = new Map();
    elements.forEach(el => {
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
    });

    groups.forEach(items => {
        items.forEach((el, index) => {
            el.style.setProperty('--reveal-delay', `${index * 90}ms`);
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
}

function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'nav__link--active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { threshold: 0.3, rootMargin: `-${getHeaderHeight()}px 0px -50% 0px` }
    );

    sections.forEach(section => observer.observe(section));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const offset = getHeaderHeight();
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

function getHeaderHeight() {
    const header = document.getElementById('header');
    return header ? header.offsetHeight : 80;
}

function initContactModal() {
    const modal = document.getElementById('contact-modal');
    const form = document.getElementById('contact-form');
    const success = document.getElementById('modal-success');
    const vacancyText = document.getElementById('modal-vacancy');
    const title = document.getElementById('modal-title');

    if (!modal || !form) return;

    const defaultTitle = 'Заявка на вакансію';
    const defaultVacancy = 'Оберіть зручний спосіб зв’язку — ми відповімо протягом дня.';

    const openModal = (vacancy = '') => {
        resetModal();
        if (vacancy) {
            title.textContent = 'Відгук на вакансію';
            vacancyText.textContent = `Вакансія: ${vacancy}. Залиште контакти — менеджер зв’яжеться з вами.`;
            form.dataset.vacancy = vacancy;
        } else {
            title.textContent = defaultTitle;
            vacancyText.textContent = defaultVacancy;
            form.dataset.vacancy = '';
        }
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        const firstInput = form.querySelector('input');
        if (firstInput) firstInput.focus();
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    };

    const resetModal = () => {
        form.reset();
        form.classList.remove('is-hidden');
        success.hidden = true;
    };

    document.querySelectorAll('[data-open-modal]').forEach(btn => {
        btn.addEventListener('click', () => openModal());
    });

    document.querySelectorAll('.vacancy-card').forEach(card => {
        const openFromCard = () => openModal(card.dataset.vacancy || '');
        card.addEventListener('click', openFromCard);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openFromCard();
            }
        });
    });

    modal.querySelectorAll('[data-close-modal]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const payload = {
            vacancy: form.dataset.vacancy || 'Загальна заявка',
            name: data.get('name'),
            phone: data.get('phone'),
            messenger: data.get('messenger'),
            message: data.get('message')
        };
        console.log('Заявка:', payload);
        form.classList.add('is-hidden');
        success.hidden = false;
        setTimeout(closeModal, 2200);
    });
}

function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    const toggle = () => {
        button.classList.toggle('is-visible', window.scrollY > 400);
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

