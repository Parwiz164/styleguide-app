jQuery(document).ready(function ($) {

    // Add bootstrap class to Woocommerce ordering select
    if ($('.woocommerce-ordering > select').length) {
        $('.woocommerce-ordering > select').addClass('form-control');
    }

    // Make dorpdown parent hover
    $('.navbar-nav .dropdown').hover(function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(250).slideDown();

    }, function() {
        $(this).find('.dropdown-menu').first().stop(true, true).delay(100).slideUp();
    });

    $('.navbar-nav .dropdown > a').click(function(){
        location.href = this.href;
    });
});