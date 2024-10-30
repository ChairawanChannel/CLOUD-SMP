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
// Like button interaction
document.querySelectorAll(".like-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    let count = icon.nextElementSibling;
    let currentCount = parseInt(count.innerText);

    if (icon.innerText === "❤️") {
      icon.innerText = "🤍";
      count.innerText = currentCount - 1;
    } else {
      icon.innerText = "❤️";
      count.innerText = currentCount + 1;
    }
  });
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
      ).innerText = `ONLINE PLAYER: ${data.players.online}`;
    } else {
      document.getElementById("playerCount").innerText =
        "Server Status: OFFLINE";
    }
  } catch (error) {
    console.error("Gagal mengambil data dari server", error);
    document.getElementById("playerCount").innerText =
      "Gagal mengambil data server";
  }
}

// Panggil fungsi fetchPlayerCount saat halaman dimuat
window.onload = fetchPlayerCount;
