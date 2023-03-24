const $boxes = document.querySelectorAll('.igallery');
$boxes.forEach(($galleryBox, boxIndex) => {
  const duration = $galleryBox.dataset.duration ? $galleryBox.dataset.duration : 400;
  createGalleryPopup($galleryBox, boxIndex, duration);

  const $btns = $galleryBox.querySelectorAll('.igallery__btn');
  $btns.forEach(($btn, index) => {
    $btn.addEventListener('click', () => {
      openGalleryPopup(boxIndex, index);
    })
  })
});

function openGalleryPopup(boxIndex, imgIndex) {
  const $popup = document.querySelectorAll('.igallery-popup')[boxIndex];
  const $slider = $popup.querySelector('.igallery-popup__slider');

  $slider.swiper.slideTo(imgIndex, 0, false);
  $popup.classList.add('igallery-popup--hide');
  $popup.classList.add('igallery-popup--active');
  setTimeout(() => $popup.classList.remove('igallery-popup--hide'), 10);
}

function closeGalleryPopup(boxIndex) {
  const $popup = document.querySelectorAll('.igallery-popup')[boxIndex];

  $popup.classList.add('igallery-popup--hide');
  setTimeout(() => {
    $popup.classList.remove('igallery-popup--hide');
    $popup.classList.remove('igallery-popup--active');
  }, 400);
}

function createGalleryPopup($galleryBox, boxIndex, duration) {
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
  $close.addEventListener('click', () => closeGalleryPopup(boxIndex));
}
import './menu.js';
import './video-player.js';
import './products.js';
import './product-card.js';
import './letters.js';
import './igallery.js';
import './smooth-scroll.js';
import './popup.js';
import './product.js';
import './tabs.js';
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
window.addEventListener('load', () => {
  const $menu = document.querySelector('.menu');
  if ($menu) {
    const $menuToggle = $menu.querySelector('.menu__toggle');
    $menuToggle.addEventListener('click', () => {
      $menu.classList.toggle('menu--active');
    });

    const $links = $menu.querySelectorAll('.menu__link');
    $links.forEach($link => {
      $link.addEventListener('click', () => $menu.classList.remove('menu--active'));
    });
  }
});
const $openBtns = document.querySelectorAll('.js-open-popup');
$openBtns.forEach($btn => {
  $btn.addEventListener('click', (e) => {
    const name = $btn.dataset.popupName;
    const extendClass = $btn.dataset.popupExtend;
    const $popup = document.querySelector(`.popup[data-name="${name}"]`);
    if (!name || !$popup) {
      return;
    }

    const $outerBtn = $btn.closest('.js-open-popup');
    if ($outerBtn) {
      e.stopPropagation();
    }

    if (extendClass && e.target.classList.contains(extendClass)) {
      return;
    }

    openPopup($popup);
  });
});



window.addEventListener('load', () => {
  const $popups = document.querySelectorAll('.popup');
  $popups.forEach($popup => {
    $popup.classList.add('popup--loaded');
    
    const $closeBtn = $popup.querySelector('.popup__close');
    $closeBtn.addEventListener('click', () => closePopup($popup));
  
    const $backdrop = $popup.querySelector('.popup__backdrop');
    $backdrop.addEventListener('click', () => closePopup($popup));
  });
});

function openPopup($popup) {
  $popup.classList.add('popup--show');
  document.body.classList.add('body--lock');
}

function closePopup($popup) {
  $popup.classList.remove('popup--show');

  const $otherOpenedPopup = document.querySelector('.popup--show');
  if (!$otherOpenedPopup) {
    document.body.classList.remove('body--lock');
  }
}
window.addEventListener('load', () => {
  const $productSliders = document.querySelectorAll('.product-card__slider');
  $productSliders.forEach($slider => {
    const $pagination = $slider.querySelector('.product-card__pagination');
    if (!$slider.classList.contains('swiper-initialized')) {
      new Swiper($slider, {
        init: true,
        loop: false,
        effect: 'fade',
        speed: 300,
        slidesPerView: 1,
        pagination: {
          el: $pagination,
          clickable: true,
        },
        on: {
          afterInit: function () {
            if (window.innerWidth >= 768) {
              clonePagination(this);
            }
          },
          slideChange: function () {
            if (window.innerWidth >= 768) {
              clonePagination(this);
            }
          }
        },
      });
    }
  
    const $sliderBullets = $pagination.querySelectorAll('.swiper-pagination-bullet');
    $sliderBullets.forEach($bullet => {
      $bullet.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 768) {
          $bullet.click();
        }
      });
    });
  
    $pagination.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 768) {
        $sliderBullets[0].click();
      }
    });
  });
});

function clonePagination(slider) {
  const $pagination = slider.pagination.el;
  if (!$pagination) {
    return;
  }

  const $oldPaginationClone = slider.el.querySelector('.swiper-pagination--clone');
  if ($oldPaginationClone !== null) {
    $oldPaginationClone.remove();
  }
  const $newPaginationClone = $pagination.cloneNode(true);
  $newPaginationClone.classList.add('swiper-pagination--clone');
  $pagination.parentNode.append($newPaginationClone);
};
const $products = document.querySelectorAll('.product');
$products.forEach($product => {
  const $navSlider = $product.querySelector('.product__nav-slider');
  const $bigSlider = $product.querySelector('.product__big-slider')
  const navSlider = new Swiper($navSlider, {
    direction: 'horizontal',
    slidesPerView: 'auto',
    spaceBetween: 15,
    breakpoints: {
      480: {
        spaceBetween: 20,
      },
      992: {
        direction: 'vertical',
        spaceBetween: 20,
      }
    }
  });
  
  new Swiper($bigSlider, {
    slidesPerView: 'auto',
    spaceBetween: 0,
    thumbs: {
      swiper: navSlider,
    },
    mousewheel: {
      sensitivity: 1.4,
    },
    navigation: {
      prevEl: '.product__nav-prev',
      nextEl: '.product__nav-next',
      clickable: true,
    },
  });
  
  window.addEventListener('resize', () => {
    if ((window.innerWidth >= 992 && navSlider.params.direction !== 'vertical') || 
        (window.innerWidth < 992 && navSlider.params.direction !== 'horizontal')) {
      navSlider.update();
    }
  });
});
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
const $anchors = document.querySelectorAll('a[href*="#"]');
$anchors.forEach($anchor => {
  $anchor.addEventListener('click', e => {
    const id = $anchor.getAttribute('href');
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (id[0] === '#') {
      e.preventDefault();
    }

    if (id === '#') {
      return;
    }

    const $elem = document.querySelector(id);
    if ($elem) {
      const offsetTop = $elem.getBoundingClientRect().top - headerHeight;
      window.scrollBy({ top: (offsetTop), left: 0, behavior: 'smooth' });
    }
  });
});
const $tabsLists = document.querySelectorAll('.tabs');
$tabsLists.forEach($tabs => {
  const $btns = $tabs.querySelectorAll('.tabs__btn');
  $btns.forEach(($btn, index) => {
    $btn.addEventListener('click', () => {
      const $oldActiveBtn = $tabs.querySelector('.tabs__btn--active');
      const $oldActiveTab = $tabs.querySelector('.tabs__item--active');
      const $newActiveBtn = $tabs.querySelectorAll('.tabs__btn')[index];
      const $newActiveTab = $tabs.querySelectorAll('.tabs__item')[index];

      $oldActiveTab.classList.remove('tabs__item--active');
      $oldActiveBtn.classList.remove('tabs__btn--active');

      $newActiveBtn.classList.add('tabs__btn--active');
      $newActiveTab.classList.add('tabs__item--active');
    });
  });
});
const videoPlayer = document.querySelector('.video-player');
if (videoPlayer) {
  const $btn = videoPlayer.querySelector('.video-player__btn');
  const $video = videoPlayer.querySelector('.video-player__video');
  const url = $video.dataset.src;
  
  $btn.addEventListener('click', () => {
    videoPlayer.classList.add('video-player--active');
    const $iframe = createYTFrame(url);
    $video.append($iframe);
  });
}

function createYTFrame(url) {
  const $iframe = document.createElement('iframe');
  $iframe.setAttribute('src', `${url}?autoplay=1`);
  $iframe.setAttribute('autoplay', '');
  $iframe.setAttribute('frameborder', '0');
  $iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  $iframe.setAttribute('allowfullscreen', '');

  return $iframe;
}