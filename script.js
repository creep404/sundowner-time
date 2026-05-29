const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dot")];
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");

let currentSlide = 0;
let slideTimer;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentSlide;
    slide.classList.toggle("active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentSlide;
    dot.classList.toggle("active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
  });
}

function queueNextSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
  queueNextSlide();
}

previousButton.addEventListener("click", () => moveSlide(-1));
nextButton.addEventListener("click", () => moveSlide(1));

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    queueNextSlide();
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

queueNextSlide();
