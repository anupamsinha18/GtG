const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuToggle.textContent = '✕';
    }
});

const mainImage = document.getElementById('main-product-image');
const thumbs = document.querySelectorAll('.gallery-thumbnails .thumb');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

const images = [
    './Assets/Gtgperfume.png',
    './Assets/Arose.png',
    './Assets/Bella.png',
    './Assets/Daises.png'
];

function updateSlider(index) {
    currentIndex = index;
    mainImage.src = images[currentIndex];

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });

    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentIndex);
    });
}

function changeImage(src) {
    const index = images.indexOf(src);
    if (index !== -1) {
        updateSlider(index);
    }
}

document.querySelector('.prev-btn').addEventListener('click', () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    updateSlider(newIndex);
});

document.querySelector('.next-btn').addEventListener('click', () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= images.length) newIndex = 0;
    updateSlider(newIndex);
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        updateSlider(index);
    });
});

const subRadios = document.querySelectorAll('input[name="subscription"]');
subRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.querySelectorAll('.subscription-box').forEach(box => {
            box.classList.remove('active');
        });

        e.target.closest('.subscription-box').classList.add('active');
    });
});

const fragOpts = document.querySelectorAll('.f-opt');
fragOpts.forEach(opt => {
    opt.addEventListener('click', (e) => {
        const container = opt.closest('.fragrance-options');

        container.querySelectorAll('.f-opt').forEach(o => o.classList.remove('selected'));

        opt.classList.add('selected');

     
        const name = opt.querySelector('.f-name').innerText;
        if (name === 'Original') updateSlider(0);
        if (name === 'Rose') updateSlider(1);
        if (name === 'Lily') updateSlider(2);
    });
});


/* COLLECTION ACCORDION */
const accItems = document.querySelectorAll('.c-accordion-item');

accItems.forEach(item => {
    const header = item.querySelector('.c-accordion-header');
    header.addEventListener('click', () => {
        // Toggle current
        const isActive = item.classList.contains('active');

        // Close all first (exclusive behavior)
        accItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.c-icon').textContent = '+';
        });

        if (!isActive) {
            item.classList.add('active');
            item.querySelector('.c-icon').textContent = '−';
        }
    });
});


/* SCROLL ANIMATIONS */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
