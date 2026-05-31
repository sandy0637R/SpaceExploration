// ====================== SWIPER ======================

const swiper = new Swiper(".swiper", {
  effect: "coverflow",

  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",

  speed: 800,
  initialSlide: 2,

  coverflowEffect: {
    rotate: 0,
    stretch: 80,
    depth: 350,
    modifier: 0.7,
    slideShadows: true,
  },

  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// ====================== INFO BOX LOGIC ======================

const titles = document.querySelectorAll(".title");
const infoBoxes = document.querySelectorAll(".info-box");

titles.forEach((title) => {
  title.addEventListener("click", (e) => {
    e.stopPropagation();

    const slide = title.closest(".swiper-slide");

    // Move corresponding slide to center
    if (typeof slide.swiperSlideIndex !== "undefined") {
      swiper.slideTo(slide.swiperSlideIndex);
    }

    const currentBox = slide.querySelector(".info-box");
    const isOpen = currentBox.classList.contains("active");

    // Close all boxes
    infoBoxes.forEach((box) => {
      box.classList.remove("active");
    });

    // Toggle clicked box
    if (!isOpen) {
      currentBox.classList.add("active");
    }
  });
});

// ====================== CLOSE INFO BOX ======================

document.addEventListener("click", () => {
  infoBoxes.forEach((box) => {
    box.classList.remove("active");
  });
});

// ====================== KEEP INFO BOX OPEN ======================

infoBoxes.forEach((box) => {
  box.addEventListener("click", (e) => {
    e.stopPropagation();

    const slide = box.closest(".swiper-slide");

    // Keep corresponding slide active
    if (typeof slide.swiperSlideIndex !== "undefined") {
      swiper.slideTo(slide.swiperSlideIndex);
    }
  });
});

const slides = document.querySelectorAll(".slide");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  current++;

  if (current >= slides.length) {
    current = 0;
  }

  showSlide(current);
});

prevBtn.addEventListener("click", () => {
  current--;

  if (current < 0) {
    current = slides.length - 1;
  }

  showSlide(current);
});

// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
  ".banner, .slider-section, .stars-section, .constellation-section, .satellite-section",
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});
