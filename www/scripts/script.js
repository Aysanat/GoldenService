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

})
