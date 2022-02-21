const parseLocation = ()=> location.hash.slice(1).toLowerCase() || '/';

const enrutador = ()=>{
    let ruta = parseLocation();
    switch(ruta){
        case '/':
            //Ocultamos
            $('#vistaContacto, #vistaTalleres').css('display', 'none');
            
            //Mostramos
            $('#vistaProductos, .slider, .btn-flotante').css('display', 'inline');

            $('#home, #homeF').addClass('text-white');
            
            $('#contacto, #contactoF, #talleres, #talleresF').removeClass('text-white');
            
            renderizarCarrito();
            $('aside').toggle();
            break;
        case '/contacto':
            //Ocultamos
            $('#vistaProductos, .slider, .btn-flotante, #vistaTalleres').css('display', 'none');

            //Mostramos
            $('#vistaContacto').css('display', 'inline');

            $('#contacto, #contactoF').addClass('text-white');
            
            $('#home, #homeF, #talleres, #talleresF').removeClass('text-white');

            break;
        case '/talleres':
            //Ocultamos
            $('#vistaProductos, #vistaContacto, .slider, .btn-flotante').css('display', 'none');
            
            //Mostramos
            $('#vistaTalleres').css('display', 'inline');
            $('aside').css('display', 'inline');
            $('#talleres, #talleresF').addClass('text-white');

            $('#home, #homeF, #contacto, #contactoF').removeClass('text-white');
            
            break;
        default: swal("ATENCIÓN!", "404 - Esta página no Existe", "info");
            break;
    }
}
$(window).on('load', function() {
    enrutador();
})

window.addEventListener('hashchange', function(){
    enrutador();    
})