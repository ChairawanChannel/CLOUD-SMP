let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Auto Carousel
setInterval(nextSlide, 3000); // Change slide every 3 seconds

// Initialize the first slide as active
showSlide(currentSlide);

//turning off right click on page
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();

});
