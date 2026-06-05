const backTop = document.getElementById("backTop");

function toggleBackTop() {
  if (!backTop) return;
  backTop.hidden = window.scrollY <= 400;
}

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  window.addEventListener("scroll", toggleBackTop, { passive: true });
  toggleBackTop();
}

/* Gallery lightbox */
(function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector(".lightbox__img");
  const lightboxCaption = lightbox?.querySelector(".lightbox__caption");
  const items = [...document.querySelectorAll(".gallery__item")];

  if (!lightbox || !lightboxImg || !items.length) return;

  let currentIndex = 0;

  function showSlide(index) {
    const total = items.length;
    currentIndex = (index + total) % total;
    const img = items[currentIndex].querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCaption) {
      lightboxCaption.textContent = img.alt;
    }
  }

  function openLightbox(index) {
    showSlide(index);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lightboxImg.removeAttribute("src");
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  lightbox.querySelector(".lightbox__backdrop")?.addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__close")?.addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__nav--prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    showSlide(currentIndex - 1);
  });
  lightbox.querySelector(".lightbox__nav--next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    showSlide(currentIndex + 1);
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (e.key === "ArrowRight") showSlide(currentIndex + 1);
  });
})();
