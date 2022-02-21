$(document).ready(function(){
    $('.add-to-cart').on('click',function(){
        //Desplazar hacia abajo si el ícono del carrito está oculto en la parte inferior
        $('html, body').animate({
            'scrolltop' : $(".btn-flotante").position().top
        });
        //Seleccion de la imagen del artículo y pasa a la función.
        var itemImg = $(this).parent().find('img').eq(0);
        volarHaciaCarrito($(itemImg), $('.cart_anchor'));
    });
});

function volarHaciaCarrito(imgProducto, volarAlCarrito) {
    var divisor = 4;
    var clonImagen = $(imgProducto).clone().css("borderRadius", "50%");

    $(clonImagen).css({position: 'absolute', top: $(imgProducto).offset().top + "px", left: $(imgProducto).offset().left + "px", opacity: 1, 'z-index': 1000});
    $('body').append($(clonImagen));
    var gotoX = $(volarAlCarrito).offset().left + ($(volarAlCarrito).width()/3) - ($(imgProducto).width()/divisor)/3;
    var gotoY = $(volarAlCarrito).offset().top + ($(volarAlCarrito).height()/3) - ($(imgProducto).height()/divisor)/3;
     
    $(clonImagen).animate({
        opacity: 0.4,
        left: gotoX,
        top: gotoY,
        width: $(imgProducto).width()/divisor,
        height: $(imgProducto).height()/divisor
    }, 750, ()=> {
        $(volarAlCarrito).fadeOut('fast', function () {
            $(volarAlCarrito).fadeIn('fast', function () {
                $(clonImagen).fadeOut('fast', function () {
                    $(clonImagen).remove();
                });
            });
        });
    });
}