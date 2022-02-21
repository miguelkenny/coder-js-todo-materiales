$(document).ready(function(){
    $('.add-to-cart').on('click',function(){
        //Scroll to bottom if cart icon is hidden on bottom
        $('html, body').animate({
            'scrollBottom' : $(".cart_anchor").position().bottom
        });
        //Select item image and pass to the function
        var itemImg = $(this).parent().find('img').eq(0);
        flyToElement($(itemImg), $('.cart_anchor'));
    });
  });

function flyToElement(flyer, flyingTo) {
    var divider = 4;
    var flyerClone = $(flyer).clone().css("borderRadius", "50%");

    $(flyerClone).css({position: 'absolute', top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, 'z-index': 1000});
    $('body').append($(flyerClone));
    var gotoX = $(flyingTo).offset().left + ($(flyingTo).width()/3) - ($(flyer).width()/divider)/3;
    var gotoY = $(flyingTo).offset().top + ($(flyingTo).height()/3) - ($(flyer).height()/divider)/3;
     
    $(flyerClone).animate({
        opacity: 0.4,
        left: gotoX,
        top: gotoY,
        width: $(flyer).width()/divider,
        height: $(flyer).height()/divider
    }, 750,
    function () {
        $(flyingTo).fadeOut('fast', function () {
            $(flyingTo).fadeIn('fast', function () {
                $(flyerClone).fadeOut('fast', function () {
                    $(flyerClone).remove();
                });
            });
        });
    });
}