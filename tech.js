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
            header.style.backgroundColor = 'rgba(0, 0, 0, 1)'
        } else {
            header.style.backdropFilter = 'blur(20px)'
            header.style.webkitBackdropFilter = 'blur(20px)'
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
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
            header.style.backgroundColor = '#161617'
        }
    })

    item.addEventListener('mouseleave', () => {
        if (mediaQuery.matches) {
            header.style.backdropFilter = 'blur(20px)'
            header.style.webkitBackdropFilter = 'blur(20px)'
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
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
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        }
    } else {
        // Handle mobile/tablet view
        if (nav.classList.contains('show-menu')) {
            header.style.backdropFilter = 'none'
            header.style.webkitBackdropFilter = 'none'
            header.style.backgroundColor = 'rgba(0, 0, 0, 1)'
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
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
        }
    }
})

addEventListener('resize', removeStyle)

/*=============== APPLE CARDS CAROUSEL ===============*/
const sliders = document.querySelectorAll(".cards-slider");

function scrollSlider(direction, sliderId) {
    const slider = document.querySelector(`#${sliderId}`);
    if (!slider) return;

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
sliders.forEach(slider => {
    let scrollTimeout;
    slider.addEventListener("scroll", () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            snapToCard(slider);
        }, 100);
    });
});

function snapToCard(slider) {
    const cardWidth = 300 + 24; // width + gap
    const scroll = slider.scrollLeft;
    const snapPoint = Math.round(scroll / cardWidth) * cardWidth;
    slider.scrollTo({ left: snapPoint, behavior: "smooth" });
}

// VERTICAL TABS FUNCTIONALITY
const featureItems = document.querySelectorAll(".feature-list li");
const img1 = document.getElementById("img1");
let currentActive = null;

function isMobile() {
    return window.innerWidth <= 991;
}

// Initialize state
const firstItem = featureItems[0];
firstItem.classList.add("active-feature");
currentActive = firstItem;
img1.src = firstItem.getAttribute("data-img");

// Hover for desktop
featureItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        if (!isMobile()) {
            if (currentActive) {
                currentActive.classList.remove("active-feature");
            }
            item.classList.add("active-feature");
            currentActive = item;
            img1.src = item.getAttribute("data-img");
        }
    });

    // Click for mobile
    item.addEventListener("click", () => {
        if (isMobile()) {
            // If clicking on already active feature, collapse it
            if (item.classList.contains("active-feature")) {
                item.classList.remove("active-feature");
            } else {
                // Collapse others
                featureItems.forEach((other) =>
                    other.classList.remove("active-feature")
                );
                item.classList.add("active-feature");
                img1.src = item.getAttribute("data-img");
            }
        }
    });
});

// Update on resize
window.addEventListener("resize", () => {
    if (!isMobile()) {
        featureItems.forEach((item) =>
            item.classList.remove("active-feature")
        );
        firstItem.classList.add("active-feature");
        img1.src = firstItem.getAttribute("data-img");
    }
});
