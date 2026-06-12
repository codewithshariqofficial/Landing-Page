document.addEventListener('DOMContentLoaded', () => {
    /* -----------------------------------------
       1. MOBILE MENU TOGGLE
       ----------------------------------------- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', () => {
            navbar.classList.toggle('mobile-active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('mobile-active');
            });
        });
    }

    /* -----------------------------------------
       2. CLI COPY TO CLIPBOARD
       ----------------------------------------- */
    const copyCli = document.getElementById('copyCli');
    if (copyCli) {
        copyCli.addEventListener('click', () => {
            const command = "npx vertex-cli@latest init";
            navigator.clipboard.writeText(command).then(() => {
                copyCli.classList.add('copied');
                
                // Change icon temporarily if needed, or just use CSS classes
                setTimeout(() => {
                    copyCli.classList.remove('copied');
                }, 2000);
            });
        });
    }

    /* -----------------------------------------
       3. PRICING TOGGLE LOGIC
       ----------------------------------------- */
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle) {
        const priceAmounts = document.querySelectorAll('.amount');
        const toggleLabels = document.querySelectorAll('.toggle-label');

        pricingToggle.addEventListener('click', () => {
            const isYearly = pricingToggle.classList.toggle('yearly');
            
            toggleLabels.forEach(label => {
                label.classList.toggle('active', (label.dataset.type === 'yearly') === isYearly);
            });

            priceAmounts.forEach(amount => {
                const targetPrice = isYearly ? amount.dataset.yearly : amount.dataset.monthly;
                
                // Simple text update
                amount.innerText = targetPrice;
                
                // Optional: add a small fade animation
                amount.style.animation = 'none';
                amount.offsetHeight; /* trigger reflow */
                amount.style.animation = 'fadeInUp 0.3s ease';
            });
        });
    }

    /* -----------------------------------------
       4. INTERSECTION OBSERVER (Scroll Reveals)
       ----------------------------------------- */
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only reveal once
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* -----------------------------------------
       5. BACK TO TOP VISIBILITY
       ----------------------------------------- */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* -----------------------------------------
       6. FAQ ACCORDION LOGIC
       ----------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close others (exclusive accordion)
            faqItems.forEach(el => el.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* -----------------------------------------
       7. SPOTLIGHT CARD EFFECT
       ----------------------------------------- */
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
