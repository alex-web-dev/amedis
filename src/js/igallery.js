import Swiper, { Pagination } from 'swiper';

Swiper.use([Pagination]);

const $boxes = document.querySelectorAll('.igallery');
$boxes.forEach(($galleryBox, boxIndex) => {
  const duration = $galleryBox.dataset.duration ? $galleryBox.dataset.duration : 400;
  createPopup($galleryBox, boxIndex, duration);

  const $btns = $galleryBox.querySelectorAll('.igallery__btn');
  $btns.forEach(($btn, index) => {
    $btn.addEventListener('click', () => {
      openPopup(boxIndex, index);
    })
  })
});

function openPopup(boxIndex, imgIndex) {
  const $popup = document.querySelectorAll('.igallery-popup')[boxIndex];
  const $slider = $popup.querySelector('.igallery-popup__slider');

  $slider.swiper.slideTo(imgIndex, 0, false);
  $popup.classList.add('igallery-popup--hide');
  $popup.classList.add('igallery-popup--active');
  setTimeout(() => $popup.classList.remove('igallery-popup--hide'), 10);
}

function closePopup(boxIndex) {
  const $popup = document.querySelectorAll('.igallery-popup')[boxIndex];

  $popup.classList.add('igallery-popup--hide');
  setTimeout(() => {
    $popup.classList.remove('igallery-popup--hide');
    $popup.classList.remove('igallery-popup--active');
  }, 400);
}

function createPopup($galleryBox, boxIndex, duration) {
  const $popup = document.createElement('div');
  $popup.className = 'igallery-popup';
  $popup.style.transitionDuration = `${duration}ms`;
  $popup.innerHTML = `
    <button class="igallery-popup__close">
      <svg class="icon "> 
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/icons.svg#close"></use>
      </svg>
    </button>
    <div class="igallery-popup__main">
      <div class="igallery-popup__slider swiper"></div>
      <div class="igallery-popup__controls">
        <button class="btn-prev btn-prev--white igallery-popup__prev">
          <svg class="icon "> 
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/icons.svg#next"></use>
          </svg>
        </button>
        <button class="btn-next btn-next--white igallery-popup__next">
          <svg class="icon "> 
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/icons/icons.svg#next"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="igallery-popup__backdrop"></div>
  `;

  const $images = $galleryBox.querySelectorAll('.igallery__img');
  const $sliderWrapper = document.createElement('div');
  $sliderWrapper.className = 'swiper-wrapper';
  $images.forEach($img => {
    const $slide = document.createElement('div');
    $slide.className = 'swiper-slide';
    $slide.innerHTML = `<img src="${$img.getAttribute('src')}">`;
    $sliderWrapper.append($slide);
  });

  document.body.appendChild($popup);

  const $slider = $popup.querySelector('.igallery-popup__slider');
  $slider.append($sliderWrapper);

  const $prev = $popup.querySelector('.igallery-popup__prev');
  const $next = $popup.querySelector('.igallery-popup__next');
  new Swiper($slider, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    speed: 600,
    navigation: {
      prevEl: $prev,
      nextEl: $next,
    },
  });

  const $close = $popup.querySelector('.igallery-popup__close');
  $close.addEventListener('click', () => closePopup(boxIndex));
}