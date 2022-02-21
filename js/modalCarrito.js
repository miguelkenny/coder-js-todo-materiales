$(document).ready(function() {
    if(nomUser.textContent != ""){
        $("#boton-pagar").on("click", function(){
            $(".overlay, .modalCarrito").addClass("active");
        });
    }
    
    $(".closeCarrito, .overlay").on("click", function(){
        $(".overlay, .modalCarrito").removeClass("active");
    });
    
    /* cerramos el modal con la tecla ESC */
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            $(".overlay, .modalCarrito").removeClass("active");
        }
    });
});