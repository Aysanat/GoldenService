$(document).ready(function() {

  let catalogModule = (function() {
    let productsContainer = $('.cards_wrap');
    let paginationConatiner = $('.pagination');
    let itemPurePage = 12;
    let currentPage = 1;
    let products = [];

    async function loadProducts() {
      try {
        let response = await $.ajax({
          url: 'products.json',
          type: 'GET',
          dataType: 'json'
        });
        if (! response) {
          throw new Error('ошибка 404')
        } else {
          products == response.products
        }
      } catch(error) {
        console.error('oшибка загрузки товаров', error)
        productsContainer.html('<p>произошла oшибка загрузки товаров, попробуйте позже</p>')
      }
    }
    function renderProducts() {
      productsContainer.empty()
      let startIndex = (currentPage - 1) * itemPurePage
      let endIndex = startIndex + itemPurePage
      let currentPageProduct = products.slice(startIndex, endIndex)
      if (currentPageProduct.length === 0) {
        productsContainer.html('<p>товары не найдены</p>')
        return
      }
      currentPageProduct.forEach(function(product) {
        const card = $('<article>').addClass('card').html(`<div class="card_visual">
                <img src="" alt="" class="card_image">
              </div>
              <div class="card_row">
                <div class="card_column">
                  <div class="card_available">
                    <div class="icon">
                      <i class="icon_img" style="background-image: url('${product.availableIcon}');"></i>
                    </div>
                    <p class="card_text">${product.available}</p>
                  </div>
                  <div class="card_present">
                    <div class="icon">
                      <i class="icon_img" style="background-image: url('images/gs-catalog-present.svg');"></i>
                    </div>
                    <p class="card_text">Подарок</p>
                  </div>
                </div>
                <div class="card_sale">SALE</div>
              </div>

              <div class="card_info">
                <h3 class="card_title"><a href="product.html" class="card_link">${product.title}</a></h3>
                <p class="card_cost">${product.newCost} <span class="card_span">${product.pastCost}</span></p>
              </div>
        `);
        productsContainer.append(card)
      })
      //обновление пагинации
    }
    function renderPagination() {
      paginationConatiner.empty()
      let totalPages = Math.ceil(products.length / itemPurePage)
      for (let i = 1; i <= totalPages; i++) {
        let button = $('<button>').text(i)
      }
    }
  })


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
                <div class="reviews_row">
                  <strong class="reviews_name">${review.name}</strong>
                  <p class="reviews_date">${review.date}</p>
                  <div class="reviews_stars">
                    <i class="stars_icon">${review.stars}</i>
                  </div>
                </div>
                <p class="reviews_text">${review.text}</p>
                <div class="reviews_actions">
                  <button class="reviews_answer">Ответить</button>
                  <button class="reviews_comments">1 комментарий</button>
                </div>
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
