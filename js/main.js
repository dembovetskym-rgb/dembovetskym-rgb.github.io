(function () {
  const GALLERY_IMAGES = [
    "images/photo_2026-06-03_14-55-49.jpg",
    "images/photo_2026-06-03_14-55-49 (2).jpg",
    "images/photo_2026-06-03_14-55-50.jpg",
    "images/photo_2026-06-03_14-55-50 (2).jpg",
    "images/photo_2026-06-03_14-55-50 (3).jpg",
    "images/photo_2026-06-03_14-55-50 (4).jpg",
    "images/photo_2026-06-03_14-55-50 (5).jpg",
    "images/photo_2026-06-03_14-55-50 (6).jpg",
    "images/photo_2026-06-03_14-55-50 (7).jpg",
    "images/photo_2026-06-03_14-55-50 (8).jpg",
    "images/photo_2026-06-03_14-55-51.jpg",
    "images/photo_2026-06-03_14-55-51 (2).jpg",
    "images/photo_2026-06-03_14-55-51 (3).jpg",
    "images/XXXL.webp",
  ];

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  const grid = document.getElementById("gallery-grid");
  if (grid) {
    GALLERY_IMAGES.forEach((src, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__item";
      btn.dataset.index = String(index);
      btn.setAttribute("aria-label", "Открыть фото " + (index + 1));

      const img = document.createElement("img");
      img.src = encodeURI(src);
      img.alt = "Пример работы — фото " + (index + 1);
      img.loading = index < 6 ? "eager" : "lazy";

      btn.appendChild(img);
      grid.appendChild(btn);
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector(".lightbox__img");
  const btnClose = lightbox?.querySelector(".lightbox__close");
  const btnPrev = lightbox?.querySelector(".lightbox__nav--prev");
  const btnNext = lightbox?.querySelector(".lightbox__nav--next");
  let currentIndex = 0;

  function showImage(index) {
    if (!lightbox || !lightboxImg) return;
    currentIndex = (index + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    lightboxImg.src = encodeURI(GALLERY_IMAGES[currentIndex]);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  grid?.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery__item");
    if (!item) return;
    showImage(Number(item.dataset.index));
  });

  btnClose?.addEventListener("click", closeLightbox);
  btnPrev?.addEventListener("click", () => showImage(currentIndex - 1));
  btnNext?.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox?.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  const ratingBlock = document.querySelector("[data-yandex-rating]");

  function formatReviews(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return count + " отзыв";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return count + " отзыва";
    return count + " отзывов";
  }

  function applyRating(valueEl, labelEl, rating, reviews) {
    valueEl.textContent = String(rating).replace(".", ",");
    if (reviews > 0) {
      labelEl.textContent = "рейтинг на Яндекс Картах · " + formatReviews(reviews);
    }
  }

  async function loadYandexRating() {
    if (!ratingBlock) return;

    const valueEl = ratingBlock.querySelector("strong");
    const labelEl = ratingBlock.querySelector("span");
    if (!valueEl || !labelEl) return;

    ratingBlock.classList.add("is-loading");

    try {
      const response = await fetch("data/rating.json", { cache: "no-store" });
      if (!response.ok) throw new Error("rating.json unavailable");

      const data = await response.json();
      if (typeof data.rating === "number") {
        applyRating(valueEl, labelEl, data.rating, Number(data.reviews) || 0);
      }
    } catch {
      /* оставляем значения из HTML */
    } finally {
      ratingBlock.classList.remove("is-loading");
    }
  }

  loadYandexRating();
})();
