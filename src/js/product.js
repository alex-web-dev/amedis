import Swiper, { Pagination, Navigation, Thumbs } from 'swiper';

Swiper.use([Pagination, Navigation, Thumbs]);

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