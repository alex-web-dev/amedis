const $productsSections = document.querySelectorAll('.products');
$productsSections.forEach($products => {
  const $slider = $products.querySelector('.products__slider');
  const $prev = $products.querySelector('.products__slider-prev');
  const $next = $products.querySelector('.products__slider-next');

  new Swiper($slider, {
    speed: 400,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
      prevEl: $prev,
      nextEl: $next,
    },
    breakpoints: {
      1321: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      641: {
        slidesPerView: 2,
        spaceBetween: 20,
      }
    }
  });
});