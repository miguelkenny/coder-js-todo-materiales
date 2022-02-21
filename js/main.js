//Declaramos las Listas
const categorias = [];
let usuarios=[];
let productos=[]; //Acá se guarda la lista de objetos del data.json

//Creamos las categorias
const categoria1 = new CategoriaProducto(1, "Herramientas Electricas");
const categoria2 = new CategoriaProducto(2, "Accesorios de Pinturas");
const categoria3 = new CategoriaProducto(3, "Pintureria");

//Creamos un usuario
const usuario1 = new LoguinUsuarios("Miguel", "Patagonia 1669", "prueba1@email.com", 1234);
const usuario2 = new LoguinUsuarios("Angel", "Las Lajas 101", "prueba2@email.com", 12345);

//Insertamos los datos de las categorias a la lista Categorias
categorias.push(categoria1, categoria2, categoria3);

//Insertamos el usuario a la lista usuarios
usuarios.push(usuario1, usuario2);

//variables
let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonPagar = document.querySelector('#boton-pagar');
let nomUser = document.querySelector("#nomUser");
const miLocalStorage = window.localStorage;

//Valor que usaremos para comprobar si el usuario está logueado o no 
let v = 0;

//Funciones
function cargarProductos() {
    productos.forEach((articulo) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-lg-4', 'shadow');
        miNodo.style.width='18rem'
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = articulo.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('imgProd', 'img-fluid');
        miNodoImagen.setAttribute('src', articulo.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${divisa} ${articulo.precio}`;
        
        // Boton Sumar Productos Compra
        const miNodoBotonSuma = document.createElement('button');
        miNodoBotonSuma.classList.add('add-to-cart', 'btn', 'btn-primary', 'btn-sm');
        miNodoBotonSuma.textContent = '+';
        miNodoBotonSuma.setAttribute('marcador', articulo.id);
        miNodoBotonSuma.addEventListener('click', anyadirProductoAlCarrito);

        // Boton Restar Productos Compra
        const miNodoBotonResta = document.createElement('button');
        miNodoBotonResta.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-3');
        miNodoBotonResta.textContent = '-';
        miNodoBotonResta.setAttribute('restar', articulo.id);
        miNodoBotonResta.addEventListener('click', quitarProductoAlCarrito);

        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBotonSuma);
        miNodoCardBody.appendChild(miNodoBotonResta);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/* Local Storage */
function guardarCarritoEnLocalStorage () {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage () {
    // ¿Existe un carrito previo guardado en LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Carga la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

//Funcion para restar productos al carrito
function removerItem(arr, item){
    var i = arr.indexOf( item );

    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

/* Quitamos productos del carrito */
function quitarProductoAlCarrito(evento){
    
    // Restamos el producto a nuestro carrito
    removerItem(carrito, evento.target.getAttribute('restar'));
    
    // Actualizamos el carrito 
    renderizarCarrito();

    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}

//Mostramos en el badge el total de productos que hay en el carrito
function contarArticulosEnCarrito(){
    badgeCarrito.textContent = carrito.length;
}

/**
* Dibuja todos los productos guardados en el carrito
*/
function renderizarCarrito(){
    // Vaciamos todo el html
    DOMcarrito.textContent = '';

    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];

    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
    
        // Obtenemos el item que necesitamos de la lista de productos
        let miItem = productos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === item;
        });
        
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario lo mantengo
            return itemId == item ? total += 1 : total;
        }, 0);
        
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2', 'mt-2', 'rounded','shadow-lg', 'scroll');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa}${miItem[0].precio}`;
        
        // Boton de borrar item completo del carrito
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
    
    contarArticulosEnCarrito();
    verificarCarritoVacio();

}

/**
* Evento para añadir un producto al carrito de compra
*/
function anyadirProductoAlCarrito(evento) {
    // Añadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'));
    
    // Actualizamos el carrito 
    renderizarCarrito();
    
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}

/**
* Evento para borrar un elemento del carrito
*/
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    
    // volvemos a renderizar
    renderizarCarrito();

    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();

}

/**
* Calcula el precio total teniendo en cuenta los productos repetidos
*/
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        let miItem = productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id == item;
        });
        // Los sumamos al total
        return total + parseInt(miItem[0].precio);
    }, 0).toFixed(2);
}

/**
* Vacia el carrito y vuelve a dibujarlo
*/
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    
    DOMbotonVaciar.classList.remove("mostrar");
    DOMbotonVaciar.classList.add("ocultar");
    
    /* Oculatmos el Carrito */
    $('aside').hide();
    clicBtnFlotante = 0;

    // Renderizamos los cambios
    renderizarCarrito();
    
    // Borra LocalStorage
    localStorage.clear();

}

/**
* Comprobar si el carrito esta vacío o no para mostrar el botón Realizar Compra
*/
function verificarCarritoVacio(){
    
    if(calcularTotal() == "0" || calcularTotal() == "0.00" || calcularTotal() == ""){
        DOMbotonPagar.classList.remove("mostrar");
        DOMbotonPagar.classList.add("ocultar");
    } else {
        DOMbotonVaciar.classList.remove("ocultar");
        DOMbotonVaciar.classList.add("mostrar");
        DOMbotonVaciar.textContent = "Vaciar Carrito";
        DOMbotonPagar.classList.remove("ocultar");
        DOMbotonPagar.classList.add("mostrar");
    }
}

/**
* Finalizar Compra
*/
function verificarLogin(){
    return nomUser.textContent != ""
}
function pagarCompra(){
    if(verificarLogin())
    {
        if(calcularTotal() != 0){
            vaciarCarrito();
            $(".overlay, .modalCarrito").addClass("active");
        } else {
            swal("ATENCIÓN!", "Su carrito está vacío", "info");
        }
    }  else{
        swal("ATENCIÓN!", "Debes iniciar sesión para realizar la compra", "info");
        $("#btnLogin").click();
    }
}

/* Mostramos u ocultamos el carrito cuando se hace click en el carrito flotante */
$('#logoCarrito').on('click',()=>{
    //Si el aside esta oculto, lo mostramos con efecto desplegado incluido el contenido
    if($('aside').is(':hidden')){
        $('aside').slideToggle(1800)
        $('.scroll').slideUp(0)
                    .delay(380)
                    .slideDown(800)
    //Si está visible lo ocultamos con efecto
    } else {
            $('.scroll').animate({ fontSize: "0px" }, 500)
                        .slideUp(300);

            $('aside').slideToggle(1000);
        }
    $('.scroll').css('fontSize', '14px');
});

//Escuchamos el evento si se carga la página
document.addEventListener('DOMContentLoaded', () => {
    
    //Peticion ajax con medtodo GET
    function peticionAjax(url, callback){
        $.ajax({
            async:false,
            type: "GET",
            url:url,
            success: callback
        });
    }
    //Recibimos la respuesta de ajax y la asignamos
    function recibirProductos(response){
        productos = response.products;

        //Escuchamos Eventos
        DOMbotonVaciar.addEventListener('click', vaciarCarrito);
        DOMbotonPagar.addEventListener('click', pagarCompra);

        //Lamada a las funciones
        cargarCarritoDeLocalStorage();
        cargarProductos();
        renderizarCarrito();
        verificarCarritoVacio();
        contarArticulosEnCarrito();
    }
    
    //Hacemos la peticion a Ajax
    peticionAjax("../json/data.json", recibirProductos);
    
});