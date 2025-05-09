document.addEventListener("DOMContentLoaded", function() {
    // ===============================================
    // REVEAL ANIMATIONS
    // ===============================================
    
    // Initialize reveal animations for elements with data-reveal attribute
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        if (revealElements.length === 0) return;
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        element.classList.add('revealed');
                    }, delay);
                    
                    // Unobserve after animation (optional)
                    if (element.dataset.once !== "false") {
                        revealObserver.unobserve(element);
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });
        
        revealElements.forEach(element => {
            // Add the hidden class to all reveal elements
            element.classList.add('hidden');
            revealObserver.observe(element);
        });
    }
    
    // ===============================================
    // PARALLAX SCROLLING
    // ===============================================
    
    function initParallaxScrolling() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.2;
                const offset = element.offsetTop;
                const distance = scrollTop - offset;
                
                if (element.dataset.parallaxDirection === 'up') {
                    element.style.transform = `translateY(${distance * -speed}px)`;
                } else {
                    element.style.transform = `translateY(${distance * speed}px)`;
                }
            });
        });
    }
    
    // ===============================================
    // TEXT SPLIT & REVEAL
    // ===============================================
    
    function initTextSplitReveal() {
        const textRevealElements = document.querySelectorAll('[data-text-reveal]');
        
        if (textRevealElements.length === 0) return;
        
        textRevealElements.forEach(element => {
            // Store original text
            const originalText = element.innerHTML;
            
            // Split text into words or characters
            const splitBy = element.dataset.textReveal;
            let html = '';
            
            if (splitBy === 'words') {
                const words = originalText.trim().split(' ');
                words.forEach((word, index) => {
                    html += `<span class="reveal-word" style="transition-delay: ${index * 0.05}s">${word}</span> `;
                });
            } else if (splitBy === 'chars') {
                const chars = originalText.trim().split('');
                chars.forEach((char, index) => {
                    html += `<span class="reveal-char" style="transition-delay: ${index * 0.03}s">${char === ' ' ? '&nbsp;' : char}</span>`;
                });
            }
            
            element.innerHTML = html;
            element.classList.add('text-reveal-ready');
            
            // Set up intersection observer for this element
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.classList.add('text-revealed');
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(element);
        });
    }
    
    // ===============================================
    // STAGGERED LIST ANIMATIONS
    // ===============================================
    
    function initStaggeredListAnimations() {
        const staggeredLists = document.querySelectorAll('[data-stagger-list]');
        
        if (staggeredLists.length === 0) return;
        
        staggeredLists.forEach(list => {
            const items = list.children;
            const baseDelay = list.dataset.staggerDelay || 0.1;
            
            Array.from(items).forEach((item, index) => {
                item.classList.add('stagger-item');
                item.style.transitionDelay = `${index * baseDelay}s`;
            });
            
            // Set up intersection observer for this list
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        list.classList.add('stagger-revealed');
                        observer.unobserve(list);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            observer.observe(list);
        });
    }
    
    // ===============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===============================================
    
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ===============================================
    // SIMPLE HOVER EFFECT
    // ===============================================
    
    function initSimpleHover() {
        // Add hover class to all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project, .interactive');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('hover-active');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('hover-active');
            });
        });
    }
    
    // ===============================================
    // INITIALIZE ALL ANIMATIONS
    // ===============================================
    
    function initAnimations() {
        initRevealAnimations();
        initParallaxScrolling();
        initTextSplitReveal();
        initStaggeredListAnimations();
        initSmoothScroll();
        initSimpleHover();
    }
    
    // Start animations after a slight delay to ensure page is fully loaded
    setTimeout(initAnimations, 100);
});