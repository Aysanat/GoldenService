$(document).ready(function() {

  let $dropdown = $('.js-dropdown');

  $('.js-menu-catalog').on('click', function() {
    $dropdown.slideToggle();
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

})
