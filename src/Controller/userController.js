const {Router} = require('express')
const {db}= require('../firebase')


//Vista registrar
function mostrarMensaje(mensaje) {
    var mensajeDiv = document.getElementById("mensajeRegistro");
    mensajeDiv.innerHTML = mensaje;
}

function mostrarMensajeDeContraseñasNoIguales(contraseña, contraseñaIgual){
    let mensaje = "";
    if(contraseña != contraseñaIgual){
        mensaje = 'La contraseña tiene que coincidir en ambos campos'
    }
    return mensaje;
}

async function mostrarMensajeDeUsuarioYaExiste(nombreUsuario){
    let mensaje = "";
    let existe = false;
    const querySnapshot= await db.collection('Usuarios').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))

    lista.forEach((elemento) => {
        if(elemento.nombreUsuario){
            insensibilizador1 = elemento.nombreUsuario.toUpperCase();
            insensibilizador2 = nombreUsuario.toUpperCase();
            if(insensibilizador1 == insensibilizador2){  
                existe = true;
            }
        }
    });
    if(existe){
        mensaje = 'El nombre de usuario elegido ya existe'
    }
    return mensaje;
}


module.exports = {mostrarMensajeDeContraseñasNoIguales,
    mostrarMensajeDeUsuarioYaExiste, mostrarMensaje}