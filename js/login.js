const btnIngresar = document.getElementById("btnIngresar");
let emailUsuario = document.getElementById("emailInicioSesion");
let passUsuario = document.getElementById("passwordInicioSesion");
let btnLogin = document.querySelector("#btnLogin")
let btnCerrarSesion = document.querySelector("#btnCerrarSesion")
let btnIniciarSesion = document.getElementById("btnIniciarSesion");
let userLocalStorage = window.localStorage;
let nombreUser
let band = false

//Validamos el correo electronico
function validarEmail(valor) {
    let expresionReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/
    let esValido = expresionReg.test(valor)

    if (esValido){
        return esValido
    } else{
        swal("ATENCIÓN!", "Ingrese una dirección de correo electrónico válido", "info")
    }
}

//Modulo Inicio de Sesion
btnIngresar.addEventListener('click', (e) => {
    e.preventDefault()

    // ¿Existe un usuario previo guardado en LocalStorage?
    if (userLocalStorage.getItem('user') !== null) {
        // Carga la información
        usuarios = JSON.parse(userLocalStorage.getItem('user'));
    }

    //Comprobamos que el campo Email no esté vacío y que Usuario y Contraseña coincidan con nuestra lista
    for(const usuario of usuarios){
        if(emailUsuario.value != "" && (usuario.email == emailUsuario.value) && (usuario.passw == passUsuario.value))
        {
            //Si es verdadero cambiamos el valor de band y guardamos el nombre del usuario
            band=true
            nombreUser = usuario.nombre
        }
    }
    if(band){
        swal("ACCESO CORRECTO!", "Inicio de sesión exitoso", "success")

        //Cerramos el formulario
        document.querySelector("#btnCerrarInicioSesion").click()
        
        document.querySelector("#miBtnRegistrarse").classList.remove("mostrar")
        btnLogin.classList.remove("mostrar")
        document.querySelector("#logoUser").classList.remove("mostrar")
        nomUser.classList.remove("mostrar")

        document.querySelector("#miBtnRegistrarse").classList.add("ocultar")
        btnLogin.classList.add("ocultar")
        
        if(v == 0){
            btnCerrarSesion.classList.add("mostrar")
            document.querySelector("#logoUser").classList.add("mostrar")
            nomUser.classList.add("mostrar")
            nomUser.textContent = nombreUser

            v = 1
        }

        if (v == 1){
            btnCerrarSesion.classList.add("ocultar")
            document.querySelector("#logoUser").classList.add("ocultar")
            nomUser.classList.add("ocultar")
            v = 0
        }
        //Limpiamos el formulario
        document.querySelector("#formInicioSesion").reset()

    }
    else{
        swal("ATENCIÓN!", "Los datos ingresados son incorrectos - Verficalos. Si aún no tienes cuenta Registrate", "info")

    }
});

//Modulo Cierre de Sesion
btnCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault()
    
    document.querySelector("#miBtnRegistrarse").classList.add("mostrar")
    
    btnLogin.classList.add("mostrar")
            
    btnCerrarSesion.classList.remove("mostrar")
    document.querySelector("#logoUser").classList.remove("mostrar")
    nomUser.classList.remove("mostrar")

    nomUser.textContent = ""

    swal("SESIÓN CERRADA", "Su sesión finalizó correctamente", "success")
    band = false

    cargarTalleres();
});

// Modulo Registro de Usuario
const btnRegistro = document.getElementById("btnRegistrar");

let nombreCompleto = document.querySelector(".nombreCompleto")
let emailRegistro = document.querySelector(".emailRegistro")
let domicilioEntrega = document.querySelector(".domicilio")
let passRegistro = document.querySelector(".passwordRegistro")
let passConfirmar = document.querySelector(".passwordConfirmar")

band = false

btnRegistro.addEventListener('click', (e) => {
    e.preventDefault()
    
    if (validarEmail(emailRegistro.value)){
        for(const usuario of usuarios){
            if(usuario.email == emailRegistro.value)
            {
                band=true
            }
        }
        if(band){
            swal("ATENCIÓN!", "El email ingresado ya existe - Inicia Sesión", "info")
            document.querySelector("#btnIniciarSesion").click()
        }
        else{
            
            if(passRegistro.value == passConfirmar.value){
                const nuevoUsuario = new LoguinUsuarios(nombreCompleto.value, domicilioEntrega.value, emailRegistro.value, passRegistro.value)
                usuarios.push(nuevoUsuario)

                swal("ATENCIÓN!", "Registro Correcto - Inicia Sesión", "success")
                
                document.querySelector("#btnCerrarRegistro").click()
                document.querySelector("#btnLogin").click()
                document.querySelector("#formRegistro").reset()
            } else{
                swal("ATENCIÓN!", "Las contraseñas no coinciden", "error")
            }
        }
        
        // Guardamos datos de usuarios nuevos en local storage 
        userLocalStorage.setItem('user', JSON.stringify(usuarios))

        // Recuperamos datos de usuarios del Local Storage 
        // ¿Existe un usuario previo guardado en LocalStorage?
        if (userLocalStorage.getItem('user') !== null) {
            console.log(userLocalStorage.getItem('user'));
            // Carga la información
            usuarios = JSON.parse(userLocalStorage.getItem('user'));
        }
    }
});



