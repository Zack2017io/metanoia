const carouselWrapper = document.querySelector('.carousel-wrapper');
        const cards = document.querySelectorAll('.card');
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        const indicators = document.querySelectorAll('.indicator');
        const cardWidth = cards[0].offsetWidth + 20; // Including margin
        let currentIndex = 0;
        let autoSlideInterval;
        const autoSlideDelay = 3000; // Time in milliseconds between slides

        function updateCarousel() {
            carouselWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            updateIndicators();
        }

        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = cards.length - 1;
            } else if (index >= cards.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            updateCarousel();
            resetAutoSlide();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
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

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        indicators.forEach(indicator => {
            indicator.addEventListener('click', goToIndicatorSlide);
        });

        // Initialize carousel and auto-slide
        updateCarousel();
        startAutoSlide();

        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + 20;
            updateCarousel();
            resetAutoSlide(); 
        }); 