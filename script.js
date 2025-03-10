AOS.init();

document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".navbar-toggler"); // Select the navbar toggle button
    const infoCards = document.querySelector(".info-cards"); // Select the info cards container
    let isExpanded = false;
    toggleButton.addEventListener("click", function () {
        if (!isExpanded) {
            infoCards.style.marginTop = "400px"; // Increase margin when menu expands
        } else {
            infoCards.style.marginTop = "0"; // Reset margin when menu collapses
        }
        isExpanded = !isExpanded; // Toggle state
    });
});


// Close dropdown when clicking outside (for mobile)
document.addEventListener("click", function (event) {
    let dropdowns = document.querySelectorAll(".nav-item.dropdown");
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.querySelector(".dropdown-menu").classList.remove("show");
        }
    });
});

// Count in About_Us section
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const speed = target / 100;
        let count = 0;

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );
    counters.forEach((counter) => observer.observe(counter));
});
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
counters.forEach(counter => observer.observe(counter));

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }
    requestAnimationFrame(animation);
}
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

// Carousel Cursor Swiping
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#carouselExampleDark");
    let isDown = false, startX, scrollLeft;
    carousel.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX;
    });
    carousel.addEventListener("mouseleave", () => {
        isDown = false;
    });
    carousel.addEventListener("mouseup", () => {
        isDown = false;
    });
    carousel.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - startX;
        if (x > 100) {
            new bootstrap.Carousel(carousel).prev();
            isDown = false;
        } else if (x < -100) {
            new bootstrap.Carousel(carousel).next();
            isDown = false;
        }
    });
});
