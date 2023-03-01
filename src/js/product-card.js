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