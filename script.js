document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('ourInitiativesDropdown');
    const dropdownMenu = dropdownToggle.nextElementSibling;
  
    // Show dropdown on hover
    dropdownToggle.parentElement.addEventListener('mouseenter', function (e) {
        // Prevent click event from firing when hovering
        e.preventDefault();
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    });
  
    // Hide dropdown on mouse leave
    dropdownToggle.parentElement.addEventListener('mouseleave', function () {
        dropdownMenu.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    });
  
    // Allow navigation to Initiative.html when clicking the link
    dropdownToggle.addEventListener('click', function (e) {
        // Remove the show class to hide dropdown
        dropdownMenu.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    });
});




const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const indicators = document.querySelectorAll('.indicator');
let cards = Array.from(document.querySelectorAll('.card3'));
let currentIndex = 0;
let cardWidth;
let autoSlideInterval;
const autoSlideDelay = 3000;
let isTransitioning = false;
const visibleCards = 3;

function updateCardWidth() {
    if (cards.length > 0) {
        cardWidth = cards[0].offsetWidth + 20;
    }
}

function updateCarousel(animated = true) {
    if (isTransitioning) return;
    if (animated) {
        carouselWrapper.style.transition = `transform 0.5s ease-in-out`;
    } else {
        carouselWrapper.style.transition = 'none';
    }
    carouselWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex % cards.length);
    });
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();

    carouselWrapper.addEventListener('transitionend', () => {
        if (currentIndex >= cards.length) {
            carouselWrapper.style.transition = 'none';
            currentIndex = 0;
            carouselWrapper.appendChild(cards[0]);
            cards.push(cards.shift());
            updateCarousel(false);
        }
        isTransitioning = false;
    }, { once: true });

    resetAutoSlide();
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();

    carouselWrapper.addEventListener('transitionend', () => {
        if (currentIndex < 0) {
            carouselWrapper.style.transition = 'none';
            currentIndex = cards.length - 1;
            carouselWrapper.insertBefore(cards[cards.length - 1], cards[0]);
            cards.unshift(cards.pop());
            updateCarousel(false);
            carouselWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        isTransitioning = false;
    }, { once: true });

    resetAutoSlide();
}

function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    const targetIndex = index % cards.length;
    const difference = targetIndex - (currentIndex % cards.length);

    if (difference > 0) {
        currentIndex += difference;
    } else if (difference < 0) {
        currentIndex += difference;
    }
    updateCarousel();

    carouselWrapper.addEventListener('transitionend', () => {
        const newTargetIndex = index % cards.length;
        const currentActualIndex = cards.findIndex(card => card === carouselWrapper.children[0]);
        const diff = newTargetIndex - currentActualIndex;

        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                const firstCard = carouselWrapper.removeChild(cards[0]);
                carouselWrapper.appendChild(firstCard);
                cards.push(cards.shift());
            }
        } else if (diff < 0) {
            for (let i = 0; i < Math.abs(diff); i++) {
                const lastCard = carouselWrapper.removeChild(cards[cards.length - 1]);
                carouselWrapper.insertBefore(lastCard, carouselWrapper.firstChild);
                cards.unshift(cards.pop());
                currentIndex++;
            }
        }
        updateCarousel(false);
        isTransitioning = false;
    }, { once: true });
    resetAutoSlide();
}

function goToIndicatorSlide(event) {
    const index = parseInt(event.target.dataset.index);
    goToSlide(index);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function initializeCarousel() {
    updateCardWidth();
    carouselWrapper.style.width = `${cards.length * cardWidth}px`;
    updateCarousel(false);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
indicators.forEach(indicator => {
    indicator.addEventListener('click', goToIndicatorSlide);
});

window.addEventListener('resize', () => {
    updateCardWidth();
    carouselWrapper.style.width = `${cards.length * cardWidth}px`;
    updateCarousel(false);
    resetAutoSlide();
});

// Initial setup
initializeCarousel();
startAutoSlide();
  