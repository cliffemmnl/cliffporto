document.addEventListener("DOMContentLoaded", function() {
    // Mobile Menu Functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const menuWrapper = document.querySelector('.menu-wrapper');
        const navLinks = document.querySelector('.nav-links');
        const navLinksItems = document.querySelectorAll('.nav-links li');

        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        document.addEventListener('click', (event) => {
            if (!menuWrapper.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                closeMobileMenuOutside(event);
            }
        });
        navLinksItems.forEach(link => link.addEventListener('click', closeMobileMenu));

        function toggleMobileMenu() {
            menuWrapper.classList.toggle('menu-open');
            mobileMenuToggle.classList.toggle('open');
            animateNavLinks();
        }

        function animateNavLinks() {
            if (menuWrapper.classList.contains('menu-open')) {
                navLinks.classList.add('menu-animate-in');
                navLinks.classList.remove('menu-animate-out');
                
                navLinksItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                    item.classList.add('link-animate');
                });
            } else {
                navLinks.classList.remove('menu-animate-in');
                navLinks.classList.add('menu-animate-out');
                
                navLinksItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                    item.classList.remove('link-animate');
                });
            }
        }

        function closeMobileMenuOutside(_) {
            menuWrapper.classList.remove('menu-open');
            mobileMenuToggle.classList.remove('open');
            navLinks.classList.remove('menu-animate-in');
            navLinks.classList.add('menu-animate-out');
            
            navLinksItems.forEach(item => {
                item.style.transitionDelay = '0s';
                item.classList.remove('link-animate');
            });
        }

        function closeMobileMenu() {
            menuWrapper.classList.remove('menu-open');
            mobileMenuToggle.classList.remove('open');
            navLinks.classList.remove('menu-animate-in');
            navLinks.classList.add('menu-animate-out');
            
            navLinksItems.forEach(item => {
                item.style.transitionDelay = '0s';
                item.classList.remove('link-animate');
            });
        }

        // Link Hover Effects
        navLinksItems.forEach(item => {
            const link = item.querySelector('a');
            
            link.addEventListener('mouseenter', () => link.classList.add('link-hover'));
            link.addEventListener('mouseleave', () => link.classList.remove('link-hover'));
        });
    }

    // Enhanced Slideshow Functionality
    function initSlideshow() {
        const slides = document.querySelectorAll('#hero .slide');
        const prevArrow = document.querySelector('#hero .prev-slide');
        const nextArrow = document.querySelector('#hero .next-slide');
        const counterCurrent = document.querySelector('.counter-current');
        const progressBar = document.querySelector('.counter-progress-bar');
        
        if (!slides.length) return;

        let currentSlide = 0;
        const totalSlides = slides.length;

        // Format slide count for display
        function formatSlideNumber(num) {
            return num < 10 ? `0${num}` : `${num}`;
        }

        // Update slide counter and progress bar
        function updateCounter() {
            counterCurrent.textContent = formatSlideNumber(currentSlide + 1);
            const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
            progressBar.style.width = `${progressWidth}%`;
        }

        function showSlide(index) {
            // Hide all slide titles first
            slides.forEach(slide => {
                slide.classList.remove('active');
                const title = slide.querySelector('.slide-title');
                if (title) {
                    title.style.opacity = '0';
                    title.style.transform = 'translateY(100%)';
                }
            });
            
            // Show the current slide
            slides[index].classList.add('active');
            
            // Animate the title after a short delay
            setTimeout(() => {
                const activeTitle = slides[index].querySelector('.slide-title');
                if (activeTitle) {
                    activeTitle.style.opacity = '1';
                    activeTitle.style.transform = 'translateY(0)';
                }
            }, 300);
            
            updateCounter();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Initialize counter
        updateCounter();

        // Add event listeners
        if (prevArrow) prevArrow.addEventListener('click', prevSlide);
        if (nextArrow) nextArrow.addEventListener('click', nextSlide);

        // Auto slideshow
        let slideInterval = setInterval(nextSlide, 5000);

        // Handle cleanup if element is removed
        slides[0].closest('.slideshow-container')?.addEventListener('DOMNodeRemoved', () => {
            clearInterval(slideInterval);
        });

        // Initialize first slide animation
        setTimeout(() => {
            const activeTitle = slides[0].querySelector('.slide-title');
            if (activeTitle) {
                activeTitle.style.opacity = '1';
                activeTitle.style.transform = 'translateY(0)';
            }
        }, 300);
    }

    function initWorkPageInteractions() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const workItems = document.querySelectorAll('.work-item');

        if (categoryButtons.length === 0 || workItems.length === 0) return;

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;

                workItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        const workItemLinks = document.querySelectorAll('.work-item a');
        workItemLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.closest('.work-item').style.opacity = '0.7';
            });
            link.addEventListener('mouseleave', function() {
                this.closest('.work-item').style.opacity = '1';
            });
        });
    }

    initMobileMenu();
    initSlideshow();
    initWorkPageInteractions();
});

// ABOUT BUTTON
const scrollBtn = document.querySelector('.scroll-button');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        document.getElementById('profile-section').scrollIntoView({ behavior: 'smooth' });
    });
}

// VIDEO
document.addEventListener("DOMContentLoaded", function() {
    function initVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.play().catch(error => {
                console.log('Auto-play was prevented:', error);
                const playButton = document.createElement('button');
                playButton.textContent = 'Play Video';
                playButton.classList.add('play-button');
                video.parentElement.appendChild(playButton);

                playButton.addEventListener('click', () => {
                    video.play().then(() => {
                        playButton.remove();
                    }).catch(err => {
                        console.log('Error playing video:', err);
                    });
                });
            });
            video.playsInline = true;

            video.play().catch(error => {
                console.log('Auto-play was prevented:', error);
            });
        });
    }

    initVideos();
});

// THANK YOU POPUP CONTACT PAGE
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("submitted") === "true") {
        const popup = document.getElementById("thank-you-popup");
        if (popup) {
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none";
                const url = new URL(window.location);
                url.searchParams.delete("submitted");
                window.history.replaceState({}, document.title, url.pathname);
            }, 4000);
        }
    }
});

// CATEGORY BUTTONS WORK PAGE
document.addEventListener('DOMContentLoaded', function() {

    const categoryButtons = document.querySelectorAll('.category-btn');

    const workItems = document.querySelectorAll('.work-item');



    categoryButtons.forEach(button => {

        button.addEventListener('click', () => {

            // Remove active class from all buttons

            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button

            button.classList.add('active');



            const category = button.getAttribute('data-category');



            workItems.forEach(item => {

                if (category === 'all' || item.getAttribute('data-category') === category) {

                    item.style.display = 'block';

                } else {

                    item.style.display = 'none';

                }

            });

        });

    });

});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (mobileMenuToggle) {
        // Remove existing event listeners
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            this.classList.toggle('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Hero Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    const counterCurrent = document.querySelector('.counter-current');
    const progressBar = document.querySelector('.counter-progress-bar');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Update counter and progress bar
    function updateCounter() {
        if (counterCurrent) {
            counterCurrent.textContent = (currentSlide + 1).toString().padStart(2, '0');
        }
        if (progressBar) {
            progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }
    }

    // Show slide
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
        updateCounter();
    }

    // Next slide
    function goToNextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Previous slide
    function goToPrevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Add event listeners to navigation arrows
    if (prevSlide) {
        prevSlide.addEventListener('click', goToPrevSlide);
    }
    if (nextSlide) {
        nextSlide.addEventListener('click', goToNextSlide);
    }

    // Initialize the slideshow
    if (slides.length > 0) {
        showSlide(currentSlide);
    }

    // Auto-advance slides every 5 seconds
    const slideInterval = setInterval(goToNextSlide, 5000);

    // Pause auto-advance when hovering over the slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        heroSlider.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
            setInterval(goToNextSlide, 5000);
        });
    }

    // Parallax scrolling effect
    const parallaxHero = document.querySelector('.parallax-hero');
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const slideContents = document.querySelectorAll('.slide-content');
    const slideCounter = document.querySelector('.slide-counter');
    const heroNavigation = document.querySelector('.hero-navigation');
    
    function handleParallax() {
        if (parallaxHero) {
            const scrollPosition = window.scrollY;
            const heroHeight = parallaxHero.offsetHeight;
            const parallaxFactor = scrollPosition / heroHeight;
            
            // Apply parallax effect to active slide background
            const activeSlide = parallaxHero.querySelector('.slide.active');
            if (activeSlide) {
                activeSlide.style.transform = `translateY(${scrollPosition * 0.4}px)`;
                // Slightly darken the image as user scrolls
                activeSlide.style.filter = `brightness(${1 - parallaxFactor * 0.3})`;
            }
            
            // Move slide content (title) in opposite direction for enhanced effect
            slideContents.forEach(content => {
                content.style.transform = `translateY(${-scrollPosition * 0.2}px)`;
                // Fade out as user scrolls
                content.style.opacity = Math.max(0, 1 - parallaxFactor * 1.5);
            });
            
            // Move counter and navigation at different speeds
            if (slideCounter) {
                slideCounter.style.transform = `translateY(${-scrollPosition * 0.1}px)`;
                slideCounter.style.opacity = Math.max(0, 1 - parallaxFactor * 1.5);
            }
            
            if (heroNavigation) {
                heroNavigation.style.transform = `translateY(${-scrollPosition * 0.15}px) translateX(-50%)`;
                heroNavigation.style.opacity = Math.max(0, 1 - parallaxFactor * 1.5);
            }
            
            // Apply to any elements with parallax-element class
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.2;
                element.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    }

    // Add scroll event listener for parallax effect
    window.addEventListener('scroll', handleParallax);
    
    // Initialize parallax on page load
    handleParallax();
});

// General mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuWrapper = document.querySelector('.menu-wrapper');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && menuWrapper && navLinks) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            menuWrapper.classList.toggle('menu-open');
            
            if (menuWrapper.classList.contains('menu-open')) {
                navLinks.classList.add('menu-animate-in');
                navLinks.classList.remove('menu-animate-out');
                
                // Animate each link
                const links = navLinks.querySelectorAll('li');
                links.forEach((link, index) => {
                    setTimeout(() => {
                        link.classList.add('link-animate');
                    }, 100 * (index + 1));
                });
            } else {
                navLinks.classList.remove('menu-animate-in');
                navLinks.classList.add('menu-animate-out');
                
                // Remove animation classes
                const links = navLinks.querySelectorAll('li');
                links.forEach(link => {
                    link.classList.remove('link-animate');
                });
            }
        });
    }
    
    // Works Page Filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    if (categoryButtons.length > 0 && workItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const category = button.getAttribute('data-category');
                
                // Filter work items
                workItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});