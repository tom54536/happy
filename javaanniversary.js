// === IMPORTANT: Change the start date to your anniversary date ===
const startDate = new Date('2024-07-04T00:00:00'); // Format: YYYY-MM-DD

// --- Slideshow functionality ---
let slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }
}

// Auto slideshow
let slideInterval;
function startAutoSlideshow() {
    // Clear any existing interval to prevent duplicates
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000); // Change image every 5 seconds
}

// --- Counter functionality ---
function countDays() {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const dayCounterElement = document.getElementById('day-counter');
    if (dayCounterElement) {
        dayCounterElement.textContent = `${diffDays} Days`;
    }
}

// --- Heart animation functionality ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const size = Math.random() * 20 + 15; // Heart size
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 100}vw`; // Random horizontal position
    heart.style.animationDuration = `${Math.random() * 2 + 1}s`; // Animation speed
    
    document.querySelector('.heart-container').appendChild(heart);
    
    // Remove heart element after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// --- Main function to start everything after user interaction ---
function startAnniversaryPage() {
    const music = document.getElementById('anniversary-music');
    const overlay = document.getElementById('overlay');
    
    // 1. Hide the overlay
    overlay.classList.add('hidden');
    
    // 2. Play the music
    music.play().catch(error => {
        console.error("Autoplay failed:", error);
    });
    
    // 3. Start the heart animation for 2 seconds
    let heartInterval = setInterval(createHeart, 50); // Create more hearts per second
    setTimeout(() => {
        clearInterval(heartInterval);
    }, 2000); // Stop after 2 seconds
    
    // 4. Start the auto slideshow
    startAutoSlideshow();
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // Show the first slide and count days immediately
    showSlides(slideIndex);
    countDays();
    
    // Add event listener to the start button inside the overlay
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', startAnniversaryPage);
    }
});