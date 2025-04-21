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






document.addEventListener('DOMContentLoaded', function() {
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
    const margin = 20; // Fixed margin between cards

    function updateCardWidth() {
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        cardWidth = (containerWidth - (margin * 2)) / 3; // 3 cards + 2 margins
        cards.forEach(card => card.style.width = `${cardWidth}px`);
        carouselWrapper.style.width = `${(cardWidth + margin) * cards.length}px`;
        console.log('Card width:', cardWidth, 'Container width:', containerWidth);
    }

    function updateCarousel(animated = true) {
        if (animated) {
            carouselWrapper.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        } else {
            carouselWrapper.style.transition = 'none';
        }

        // Update the transform position
        const transformValue = -currentIndex * (cardWidth + margin);
        carouselWrapper.style.transform = `translateX(${transformValue}px)`;
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

        const nextIndex = (currentIndex + 1) % cards.length;
        updateCarousel(true);

        carouselWrapper.addEventListener('transitionend', () => {
            currentIndex = nextIndex;
            isTransitioning = false;
        }, { once: true });

        resetAutoSlide();
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel(true);

        carouselWrapper.addEventListener('transitionend', () => {
            currentIndex = prevIndex;
            isTransitioning = false;
        }, { once: true });

        resetAutoSlide();
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const targetIndex = index % cards.length;

        if (currentIndex === targetIndex) {
            isTransitioning = false;
            return;
        }

        currentIndex = targetIndex;
        updateCarousel(true);

        carouselWrapper.addEventListener('transitionend', () => {
            isTransitioning = false;
        }, { once: true });

        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, autoSlideDelay);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function initializeCarousel() {
        updateCardWidth();
        updateCarousel(false);
        console.log('Carousel initialized');
    }

    if (prevButton) { // Check if the element exists before adding listener
        prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) { // Check if the element exists before adding listener
        nextButton.addEventListener('click', nextSlide);
    }
    indicators.forEach(indicator => {
        if (indicator) { // Check if the element exists before adding listener
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                goToSlide(index);
            });
        }
    });

    window.addEventListener('resize', () => {
        updateCardWidth();
        updateCarousel(false);
        resetAutoSlide();
    });

    initializeCarousel();
    startAutoSlide();
});
