document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('ourInitiativesDropdown');
    const dropdownMenu = dropdownToggle.nextElementSibling;

    // Show dropdown on hover
    dropdownToggle.parentElement.addEventListener('mouseenter', function (e) {
        e.preventDefault(); // Keep this if absolutely necessary
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
    });

    // Hide dropdown on mouse leave
    dropdownToggle.parentElement.addEventListener('mouseleave', function () {
        dropdownMenu.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
    });

    // Programmatically navigate on click
    dropdownToggle.addEventListener('click', function (e) {
        dropdownMenu.classList.remove('show');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        window.location.href = dropdownToggle.getAttribute('href'); // Navigate
    });
});





document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const indicators = document.querySelectorAll('.indicator');
    let cards = Array.from(document.querySelectorAll('.card3'));
    let cardWidth;
    let autoSlideInterval;
    let currentIndex = 0;
    const autoSlideDelay = 3000;
    let isTransitioning = false;
    const visibleCards = 3;
    const margin = 20; // Fixed margin between cards

    function applyCarouselTransition() {
        carouselWrapper.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    function updateCardWidth() {
        const containerWidth = document.querySelector('.carousel-container').offsetWidth;
        cardWidth = (containerWidth - (margin * (visibleCards - 1))) / visibleCards;
        carouselWrapper.querySelectorAll('.card3').forEach(card => card.style.width = `${cardWidth}px`);
        carouselWrapper.style.width = `${(cardWidth + margin) * cards.length - margin}px`;
    }

    function updateIndicators() {
        const realCardsCount = getRealCardsCount();
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === ((currentIndex - visibleCards + realCardsCount) % realCardsCount));
        });
    }

    // Clone cards at the start and end for seamless looping
    function setupClones() {
        // Remove existing clones
        carouselWrapper.querySelectorAll('.card3.clone').forEach(clone => clone.remove());

        // Clone last N cards to the start
        for (let i = cards.length - visibleCards; i < cards.length; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('clone');
            carouselWrapper.insertBefore(clone, carouselWrapper.firstChild);
        }
        // Clone first N cards to the end
        for (let i = 0; i < visibleCards; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('clone');
            carouselWrapper.appendChild(clone);
        }

        // Clone last N cards to the start
        for (let i = cards.length - visibleCards; i < cards.length; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('clone');
            carouselWrapper.insertBefore(clone, carouselWrapper.firstChild);
        }
        // Clone first N cards to the end
        for (let i = 0; i < visibleCards; i++) {
            const clone = cards[i].cloneNode(true);
            clone.classList.add('clone');
            carouselWrapper.appendChild(clone);
        }
        // Update cards NodeList
        cards = Array.from(carouselWrapper.querySelectorAll('.card3:not(.clone), .card3.clone'));
    }

    function getRealCardsCount() {
        return carouselWrapper.querySelectorAll('.card3:not(.clone)').length;
    }

    function jumpToRealSlide(index) {
        carouselWrapper.style.transition = 'none';
        currentIndex = index;
        const transformValue = -(currentIndex * (cardWidth + margin));
        carouselWrapper.style.transform = `translateX(${transformValue}px)`;
        // Force reflow to apply transition next time
        void carouselWrapper.offsetWidth;
        applyCarouselTransition();
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateCarousel(true);

        // If we've moved into the cloned slides at the end, jump to the real first slide
        carouselWrapper.addEventListener('transitionend', function handler() {
            carouselWrapper.removeEventListener('transitionend', handler);
            if (currentIndex === getRealCardsCount() + visibleCards) {
                jumpToRealSlide(visibleCards);
            }
            isTransitioning = false;
            updateIndicators();
        }, { once: true });
        resetAutoSlide();
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateCarousel(true);

        // If we've moved into the cloned slides at the start, jump to the real last slide
        carouselWrapper.addEventListener('transitionend', function handler() {
            carouselWrapper.removeEventListener('transitionend', handler);
            if (currentIndex === 0) {
                jumpToRealSlide(getRealCardsCount());
            }
            isTransitioning = false;
            updateIndicators();
        }, { once: true });
        resetAutoSlide();
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        // Offset by visibleCards because of clones at the start
        currentIndex = index + visibleCards;
        updateCarousel(true);
        carouselWrapper.addEventListener('transitionend', () => {
            updateIndicators();
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

    function updateCarousel(animate = true) {
        if (animate) {
            applyCarouselTransition();
        } else {
            carouselWrapper.style.transition = 'none';
        }
        const transformValue = -(currentIndex * (cardWidth + margin));
        carouselWrapper.style.transform = `translateX(${transformValue}px)`;
    }

    function initializeCarousel() {
        setupClones();
        updateCardWidth();
        // Start at the first real slide (after clones)
        currentIndex = visibleCards;
        updateCarousel(false);
        updateIndicators();
    }

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    indicators.forEach(indicator => {
        if (indicator) {
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