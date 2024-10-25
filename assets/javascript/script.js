let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
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
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// smut scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetID = this.getAttribute("href");
    const targetElement = document.querySelector(targetID);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

//back to top
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "flex";
  } else {
    backToTopButton.style.display = "none";
  }
};

// Smooth scroll ke atas saat tombol Back to Top diklik
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// toggle dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
}

// nutup dropdown kalau ngeklik di luar
window.onclick = function (event) {
  if (!event.target.closest(".profile")) {
    document.getElementById("profileDropdown").style.display = "none";
  }
};
