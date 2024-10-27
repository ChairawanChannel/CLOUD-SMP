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

// carousel riview
const carouselWrapper = document.querySelector(".carousel-riview-wrapper");
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Duplikasi card di dalam carousel untuk membuat efek infinite
function duplicateCards() {
  const cards = Array.from(document.querySelectorAll(".carousel-riview-card"));
  cards.forEach((card) => {
    carouselWrapper.appendChild(card.cloneNode(true)); // Clone ke bagian akhir
  });
}

// Panggil fungsi untuk menduplikasi card
duplicateCards();

// Start dragging
carouselWrapper.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPos = e.clientX;
  carouselWrapper.classList.add("active"); // Show grabbing cursor
});

// Stop dragging
carouselWrapper.addEventListener("mouseup", () => {
  isDragging = false;
  carouselWrapper.classList.remove("active"); // Restore grab cursor
  prevTranslate = currentTranslate;
});

// Cancel dragging if mouse leaves
carouselWrapper.addEventListener("mouseleave", () => {
  isDragging = false;
  carouselWrapper.classList.remove("active");
  prevTranslate = currentTranslate;
});

// Move carousel while dragging
carouselWrapper.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const currentPos = e.clientX;
  const movement = currentPos - startPos;
  currentTranslate = prevTranslate + movement;
  carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;

  // Infinite scroll effect
  const totalWidth = carouselWrapper.scrollWidth / 2; // Setengah dari total wrapper yang digandakan
  if (currentTranslate < -totalWidth) {
    currentTranslate = 0;
    prevTranslate = 0;
    carouselWrapper.style.transition = "none";
    carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;
  } else if (currentTranslate > 0) {
    currentTranslate = -totalWidth;
    prevTranslate = currentTranslate;
    carouselWrapper.style.transition = "none";
    carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;
  }
});

// player count in server
async function fetchPlayerCount() {
  try {
    // URL endpoint dengan IP server Minecraft kamu
    const response = await fetch(
      "https://api.mcsrvstat.us/2/sh1.nexuscloud.shop:19133"
    );
    const data = await response.json();

    // Mengecek apakah server online dan menampilkan jumlah player
    if (data.online) {
      document.getElementById(
        "playerCount"
      ).innerText = `Player Join: ${data.players.online}`;
    } else {
      document.getElementById("playerCount").innerText =
        "Server sedang offline";
    }
  } catch (error) {
    console.error("Gagal mengambil data dari server", error);
    document.getElementById("playerCount").innerText =
      "Gagal mengambil data server";
  }
}

// Panggil fungsi fetchPlayerCount saat halaman dimuat
window.onload = fetchPlayerCount;
