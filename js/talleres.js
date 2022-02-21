let cursos = []; //Guardamos las ofertas del offers.json

const idTaller = document.querySelector('#taller');

//Cargamos los talleres al DOM
function cargarTalleres(){
    idTaller.textContent = '';
    cursos.forEach((taller, i) => {
        let itemsTalleres = document.createElement('div');
        itemsTalleres.className = 'col-lg-3 mb-4 me-2 text-center border shadow rounded bg-talleres'
        
        let imgTaller = document.createElement('img');
        imgTaller.className = 'rounded-circle m-4 border border-2 shadow';
        imgTaller.setAttribute('style', 'width:240px; height:240px;')
        imgTaller.setAttribute('src', taller.imagen);

        let tituloTaller = document.createElement('p');
        tituloTaller.className = 'fs-3'
        tituloTaller.textContent = taller.nombre;

        let precioTaller = document.createElement('p');
        precioTaller.textContent = taller.precio;

        let divCalendar = document.createElement('div');
        divCalendar.className = 'd-flex justify-content-center';

        let fechaTaller = document.createElement('input');
        fechaTaller.className = `input-group-text mb-4 input-calendar${i+1}`;
        fechaTaller.setAttribute('id',`calendario${i+1}`);
        fechaTaller.setAttribute('placeholder','Escoger Fecha »')
        fechaTaller.setAttribute('marcador',taller.id);

        divCalendar.appendChild(fechaTaller);

        let btnConfirmar = document.createElement('a');
        btnConfirmar.className = `btn btn-primary mb-4 shadow btn-confirmar`
        btnConfirmar.setAttribute('id', `btn${i+1}`)
        btnConfirmar.textContent = 'Confirmar Fecha';

        itemsTalleres.appendChild(imgTaller);
        itemsTalleres.appendChild(tituloTaller);
        itemsTalleres.appendChild(precioTaller);
        itemsTalleres.appendChild(divCalendar);
        itemsTalleres.appendChild(btnConfirmar);

        idTaller.appendChild(itemsTalleres);
    });
}

//Confirmamos la asistencia al taller
function confirmarRegistro(objInput, objBtn) {
    objInput.val('');
    objInput.css('display', 'none');
    objBtn.text('Fecha Confirmada');
    objBtn.addClass('btn-success');
}

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
    function recibirTalleres(response){
        cursos = response.talleres;
        cargarTalleres();
    }
    
    //Hacemos la peticion a Ajax
    peticionAjax("../json/talleres.json", recibirTalleres);

    //Mostramos el calendario en cada Input
    $(function() {
        $("#calendario1, #calendario2, #calendario3").datepicker({ minDate: -0, maxDate: "+1M" });
        $("#anim").on("change", function() {
            $("#calendario1, #calendario2, #calendario3").datepicker("option", "showAnim", $(this).val());
        });
    });

    $('.btn-confirmar').click(function() {
        if(verificarLogin()){
           if($('.input-calendar1').val()!=''){
            swal("GRACIAS!", "Te registraste correctamente al taller. Te esperamos!", "success");
            confirmarRegistro($('.input-calendar1'), $('#btn1'));
           }
           if($('.input-calendar2').val()!=''){
            swal("GRACIAS!", "Te registraste correctamente al taller. Te esperamos!", "success");
            confirmarRegistro($('.input-calendar2'), $('#btn2'));
           }
           if($('.input-calendar3').val()!=''){
            swal("GRACIAS!", "Te registraste correctamente al taller. Te esperamos!", "success");
            confirmarRegistro($('.input-calendar3'), $('#btn3'));
           }
        } else{
            swal("ATENCIÓN!", "Debes iniciar sesión para rgistrarte a los talleres", "info");
            $("#btnLogin").click();
        }
        
    });
});