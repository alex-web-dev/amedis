const $lettersSections = document.querySelectorAll('.letters');
$lettersSections.forEach($letters => {
  const $slider = $letters.querySelector('.letters__slider');
  const $prev = $letters.querySelector('.letters__slider-prev');
  const $next = $letters.querySelector('.letters__slider-next');

  new Swiper($slider, {
    speed: 400,
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      prevEl: $prev,
      nextEl: $next,
    },
    breakpoints: {
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      641: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }
  });
});