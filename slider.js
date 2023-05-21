var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
      invert: false,
  },
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  autoHeight: true,
  pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
  }
});
