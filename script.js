/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        header = document.querySelector('.header')

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle('show-icon')

        // Toggle blur effect
        if (nav.classList.contains('show-menu')) {
            header.style.backdropFilter = 'none'
            header.style.webkitBackdropFilter = 'none'
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)'
        } else {
            header.style.backdropFilter = 'blur(20px)'
            header.style.webkitBackdropFilter = 'blur(20px)'
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
        }
    })
}

showMenu('nav-toggle', 'nav-menu')

/*=============== SHOW DROPDOWN MENU ===============*/
const dropdownItems = document.querySelectorAll('.dropdown__item')

// 1. Select each dropdown item
dropdownItems.forEach((item) => {
    const dropdownButton = item.querySelector('.dropdown__button')

    // 2. Select each button click
    dropdownButton.addEventListener('click', () => {
        // 7. Select the current show-dropdown class
        const showDropdown = document.querySelector('.show-dropdown')

        // 5. Call the toggleItem function
        toggleItem(item)

        // 8. Remove the show-dropdown class from other items
        if (showDropdown && showDropdown !== item) {
            toggleItem(showDropdown)
        }
    })
})

// 3. Create a function to display the dropdown
const toggleItem = (item) => {
    // 3.1. Select each dropdown content
    const dropdownContainer = item.querySelector('.dropdown__container')

    // 6. If the same item contains the show-dropdown class, remove
    if (item.classList.contains('show-dropdown')) {
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else {
        // 4. Add the maximum height to the dropdown content and add the show-dropdown class
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

/*=============== DELETE DROPDOWN STYLES ===============*/
const mediaQuery = matchMedia('(min-width: 1118px)'),
    dropdownContainer = document.querySelectorAll('.dropdown__container')

// Handle blur effect on dropdown hover
const header = document.querySelector('.header')
dropdownItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        if (mediaQuery.matches) {
            header.style.backdropFilter = 'none'
            header.style.webkitBackdropFilter = 'none'
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)'
        }
    })

    item.addEventListener('mouseleave', () => {
        if (mediaQuery.matches) {
            header.style.backdropFilter = 'blur(20px)'
            header.style.webkitBackdropFilter = 'blur(20px)'
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
        }
    })
})

// Function to remove dropdown styles in mobile mode when browser resizes
const removeStyle = () => {
    const header = document.querySelector('.header')
    const nav = document.getElementById('nav-menu')

    // Validate if the media query reaches 1118px
    if (mediaQuery.matches) {
        // Remove the dropdown container height style
        dropdownContainer.forEach((e) => {
            e.removeAttribute('style')
        })

        // Remove the show-dropdown class from dropdown item
        dropdownItems.forEach((e) => {
            e.classList.remove('show-dropdown')
        })

        // Reset header styles for desktop
        if (!nav.classList.contains('show-menu')) {
            header.style.backdropFilter = 'blur(20px)'
            header.style.webkitBackdropFilter = 'blur(20px)'
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
        }
    } else {
        // Handle mobile/tablet view
        if (nav.classList.contains('show-menu')) {
            header.style.backdropFilter = 'none'
            header.style.webkitBackdropFilter = 'none'
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)'
        }
    }
}

// Add click outside handler to restore blur effect when clicking outside menu
document.addEventListener('click', (e) => {
    const nav = document.getElementById('nav-menu')
    const toggle = document.getElementById('nav-toggle')
    const header = document.querySelector('.header')

    // If clicking outside of nav menu and toggle button
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('show-menu')
        toggle.classList.remove('show-icon')

        // Restore blur effect
        if (!mediaQuery.matches) {
            header.style.backdropFilter = 'blur(20px)'
            header.style.webkitBackdropFilter = 'blur(20px)'
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
        }
    }
})

addEventListener('resize', removeStyle)

/*=============== INITIALIZE SWIPER ===============*/
window.addEventListener('load', function () {
    const swiper = new Swiper('.mySwiper', {
        // Essential parameters
        direction: 'horizontal',
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween: 0,

        // Autoplay configuration
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true
        },

        // Speed of transitions
        speed: 1000,

        // Effects
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
            }
        },

        // Events
        on: {
            init: function () {
                updateSlideContent(this.activeIndex);
            },
            slideChangeTransitionStart: function () {
                hideSlideContent();
            },
            slideChangeTransitionEnd: function () {
                updateSlideContent(this.activeIndex);
            }
        }
    });

    // Play/Pause functionality
    const playPauseButton = document.getElementById('swiperPlayPause');
    const playPauseIcon = document.getElementById('playPauseIcon');
    let isPlaying = true;

    if (playPauseButton && playPauseIcon) {
        playPauseButton.addEventListener('click', function () {
            if (isPlaying) {
                swiper.autoplay.stop();
                playPauseIcon.classList.remove('ri-pause-fill');
                playPauseIcon.classList.add('ri-play-fill');
            } else {
                swiper.autoplay.start();
                playPauseIcon.classList.remove('ri-play-fill');
                playPauseIcon.classList.add('ri-pause-fill');
            }
            isPlaying = !isPlaying;
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function (e) {
        switch (e.key) {
            case 'ArrowLeft':
                swiper.slidePrev();
                break;
            case 'ArrowRight':
                swiper.slideNext();
                break;
            case ' ':
                if (playPauseButton) {
                    e.preventDefault();
                    playPauseButton.click();
                }
                break;
        }
    });

    // Helper functions for slide content animation
    function hideSlideContent() {
        const contents = document.querySelectorAll('.slide-content');
        contents.forEach(content => {
            content.style.opacity = '0';
            content.style.transform = 'translate(-50%, -50%) scale(0.9)';
        });
    }

    function updateSlideContent(activeIndex) {
        const contents = document.querySelectorAll('.slide-content');
        contents.forEach((content, index) => {
            if (index === activeIndex) {
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 300);
            }
        });
    }
});

/*=============== LAPTOP SHOWCASE ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.categories-track');
    const wrapper = document.querySelector('.categories-wrapper');
    const items = document.querySelectorAll('.category-item');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const laptopImage = document.querySelector('.laptop-mockup img');
    const categoryContent = document.querySelector('.category-content');
    const categoryTitle = document.querySelector('.category-title');
    const categoryDescription = document.querySelector('.category-description');

    // Content mapping for each category
    const categoryData = {
        'Software Development': {
            image: 'images/screen1.png',
            title: 'Software Development',
            description: 'Craft powerful software solutions with cutting-edge technologies. Our development expertise spans web, mobile, and enterprise applications, ensuring robust and scalable solutions for your business needs.'
        },
        'Architecture': {
            image: 'images/screen2.png',
            title: 'Architecture Design',
            description: 'Create stunning architectural designs with precision and creativity. Our architectural solutions combine aesthetic beauty with functional excellence for sustainable and innovative spaces.'
        },
        'UI/UX Design': {
            image: 'images/screen3.png',
            title: 'UI/UX Design',
            description: 'Deliver exceptional user experiences through intuitive and beautiful interfaces. Our design approach focuses on user-centered solutions that engage and delight while meeting business objectives.'
        },
        'Digital Marketing': {
            image: 'images/screen4.png',
            title: 'Digital Marketing',
            description: 'Transform your online presence with strategic digital marketing solutions. Our comprehensive approach combines SEO, social media, and content marketing to drive growth and engagement.'
        },
        'WordPress': {
            image: 'images/screen5.png',
            title: 'WordPress Development',
            description: 'Build and manage your website with our expert WordPress development services. We create custom themes and plugins to enhance your site’s functionality and user experience.'
        }
    };

    let currentIndex = 0;
    let isAnimating = false; // Prevent multiple clicks during animation

    function updateCategory(newIndex) {
        if (newIndex < 0 || newIndex >= items.length || isAnimating) return;

        isAnimating = true;

        // Update active class
        items[currentIndex].classList.remove('active');
        items[newIndex].classList.add('active');

        const selectedCategory = items[newIndex].textContent.trim();
        const categoryInfo = categoryData[selectedCategory];

        // Update image with fade effect
        laptopImage.style.opacity = '0';
        categoryContent.classList.remove('show');

        setTimeout(() => {
            laptopImage.src = categoryInfo.image;
            categoryTitle.textContent = categoryInfo.title;
            categoryDescription.textContent = categoryInfo.description;

            laptopImage.style.opacity = '1';
            categoryContent.classList.add('show');
        }, 300);

        // Calculate the scroll position with improved centering
        const itemWidth = items[newIndex].offsetWidth;
        const wrapperWidth = wrapper.offsetWidth;
        const targetItem = items[newIndex];
        const targetLeft = targetItem.offsetLeft;
        const targetCenter = targetLeft + (itemWidth / 2);
        const wrapperCenter = wrapperWidth / 2;
        const scrollPos = targetCenter - wrapperCenter;

        // Apply smooth scroll with bounds checking
        const maxScroll = track.scrollWidth - wrapperWidth;
        const boundedScrollPos = Math.max(0, Math.min(scrollPos, maxScroll));
        track.style.transform = `translateX(-${boundedScrollPos}px)`;

        currentIndex = newIndex;

        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === items.length - 1 ? '0.5' : '1';

        // Reset animation flag after transition completes
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }    // Initialize button states
    prevButton.style.opacity = '0.5';

    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        updateCategory(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        updateCategory(currentIndex + 1);
    });

    // Allow clicking on categories
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateCategory(index);
        });
    });

    // Initialize first item
    updateCategory(0);
});

/*=============== APPLE CARDS CAROUSEL ===============*/
const slider = document.getElementById("cardsSlider");

function scrollSlider(direction) {
    const cardWidth = 300 + 24; // width + gap
    slider.scrollBy({
        left: direction * cardWidth,
        behavior: "smooth",
    });
}

// Modal dynamic content
const cardModal = document.getElementById("cardModal");
cardModal.addEventListener("show.bs.modal", function (event) {
    const card = event.relatedTarget;
    const title = card.getAttribute("data-title");
    const category = card.getAttribute("data-category");
    const image = card.getAttribute("data-image");

    cardModal.querySelector(".modal-title").textContent = title;
    cardModal.querySelector("#modalImage").src = image;
    cardModal.querySelector("#modalCategory").textContent =
        category;
    cardModal.querySelector("#modalDescription").textContent =
        "This is a detailed description for: " +
        title +
        ". Apple-inspired modal popup design.";
});

// Snap fix after scroll ends
let scrollTimeout;
slider.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        snapToCard();
    }, 100);
});

function snapToCard() {
    const cardWidth = 300 + 24; // width + gap
    const scroll = slider.scrollLeft;
    const snapPoint = Math.round(scroll / cardWidth) * cardWidth;
    slider.scrollTo({ left: snapPoint, behavior: "smooth" });
}

// FAQS accordians section
const buttons = document.querySelectorAll(".btn3c");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Close all other accordions first
        buttons.forEach((otherButton) => {
            if (otherButton !== button) {
                const otherFaq = otherButton.nextElementSibling;
                const otherIcon = otherButton.querySelector("i");
                if (otherFaq) {
                    otherFaq.classList.remove("show");
                }
                if (otherIcon) {
                    otherIcon.classList.remove("rotate");
                }
            }
        });

        // Toggle the clicked accordion
        const faq = button.nextElementSibling;
        const icon = button.querySelector("i");
        if (faq) {
            faq.classList.toggle("show");
        }
        if (icon) {
            icon.classList.toggle("rotate");
        }
    });
});
