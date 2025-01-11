$(document).ready(function() {

  let $dropdown = $('.js-dropdown');

  $('.js-menu-catalog').on('click', function() {
    $dropdown.slideToggle();
  });

  let $menu = $('.js-menu');
  $('.js-burger').on('click', function() {
    $menu.slideToggle();
  });

  $('.js-tabs-link').on('click', function(event) {
    event.preventDefault();

    $('.js-tabs-link').removeClass('active');
    $(this).addClass('active');

    let index = $(this).index('.js-tabs-link');

    $('.js-tab-item').removeClass('active');
    $('.js-tab-item').eq(index).addClass('active');

  });

  let prevAccordionBtn;
  let openClass = 'open';


  $('.js-accordion-btn').on('click', function() {
    if (this === prevAccordionBtn) {
      $(this).toggleClass(openClass)
      $(this).next().slideToggle();
      return;
    }

    $(prevAccordionBtn).removeClass(openClass);
    $(prevAccordionBtn).next().slideUp();

    $(this).addClass(openClass)
    $(this).next().slideDown();

    prevAccordionBtn = this;
  });


  $('.js-reviews-more').on('click', function() {

    let btn = this;

    $(btn).attr('disabled', 'disabled')

    $.ajax({
      type: 'POST',
      url: '../jsons/reviews.json',
      data: {
        quantity: 3
      },

      success: function(res) {
        let reviewsHtmlString = createReviewsHtml(res.reviews)
        console.log(reviewsHtmlString);

        $('.js-reviews-list').append(reviewsHtmlString);
        $(btn).removeAttr('disabled')
      },
      error: function() {
        console.log('error');
      }
    });
  });

  function createReviewsHtml(reviewsArray) {
    let result = ''

    reviewsArray.forEach(function(review) {
      result += `<div class="reviews_item">
            <strong class="reviews_name">"${review.name}"</strong>
            <p class="reviews_date">"${review.date}"</p>
            <div class="reviews_stars">
                  <i class="stars_icon">"${review.stars}"</i>
                </div>
            <p class="reviews_text">"${review.text}"</p>
          </div>`
    })

    return result;
  }

  let currentIndex = 0;
  let items = $('.js-carousel-slide');
  let totalItems = items.length;

  function updateCarousel() {
    let offset = -currentIndex * 100;
    $('.js-carousel-row').css('transform', 'translateX(' + offset + '%)')
    if (currentIndex === totalItems - 1) {
      $('.js-next').attr('disabled', 'disabled')
    } else {
      $('.js-next').removeAttr('disabled')
    }

    if (currentIndex === 0) {
      $('.js-prev').attr('disabled', 'disabled')
    } else {
      $('.js-prev').removeAttr('disabled')
    }
  }

  $('.js-next').on('click', function() {
    if (currentIndex < totalItems - 1) {
      currentIndex++
      updateCarousel();
    }
  });

  $('.js-prev').on('click', function() {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel();
    }
  });

  updateCarousel();

})
