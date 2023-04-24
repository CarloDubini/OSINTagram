"use strict";







async function obtenerDatosPorTitulo(titulo,lista){  
    var encontrado = false;
    var publicacion;
    if (lista && lista.length > 0) {
        lista.forEach((elemento) => {
            if(elemento.titulo === titulo){
                publicacion = elemento;
                encontrado = true;
            }
        });
    } else {
        console.log('La lista de publicaciones está vacía o no está definida.');
    }

    if (!encontrado) {
        console.log(`La publicacion con titulo: ${titulo} no se encontró`);
    } else {
        console.log(`Los datos de la publicacion con titulo: ${titulo} son:\n[\n{ Id:${publicacion.id}}\n{ Titulo:${publicacion.titulo}}\n{ Localizacion:${publicacion.localizacion}}\n{ Descripcion:${publicacion.descripcion}}\n{ Imagen:${publicacion.imagen}}\n]`);
    }
    
    return publicacion;
}
//Prueba para los Test Unitarios
async function pruebaDatosPorTítulo(lista){
    try {
        await obtenerDatosPorTitulo('Tanque en la Universidad Complutense',lista);
        await obtenerDatosPorTitulo('Asesinato en Aluche',lista);
    } catch (error) {
        console.log(error);
    }
}
//Buscar por palabra clave
async function buscarPorPalabraClave(palabra, lista) {
    var encontrado = false;
    var listaResultado = [];
    let insensibilizador1 = "";
    let insensibilizador2 = "";

    palabra = palabra.toUpperCase();

    if (lista && lista.length > 0) {
        lista.forEach((elemento) => {
            if(elemento.titulo && elemento.descripcion){
                insensibilizador1 = elemento.titulo.toUpperCase();
                insensibilizador2 = elemento.descripcion.toUpperCase();
                if(insensibilizador1.includes(palabra) || insensibilizador2.includes(palabra)){  
                    listaResultado.push(elemento);
                    encontrado = true;
                }
            }
        });
    }
    else {
        console.log('La lista de publicaciones está vacía o no está definida.');
    }

    if (!encontrado) {
        console.log(`No se ha encontrado ninguna publicacion con la palabra clave: ${palabra}`);
    } 

    return listaResultado;
}
async function pruebaBusquedaPorPalabraClave(lista){
    try {
        await buscarPorPalabraClave('Lugansk',lista);
        await buscarPorPalabraClave('Embid',lista);
    } catch (error) {
        console.log(error);
    }
}
async function ordenarAlfabeticamente(lista){
    lista.sort((a, b) => a.titulo.localeCompare(b.titulo))
    return lista;
}

//Vista reportar
function mostrarMensaje(mensaje) {
    var mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.innerHTML = mensaje;
}

function mostrarMensajeDeReporte(numeroReportes){
    let mensaje = "";
    if(numeroReportes >= 10){
        mensaje = 'Esta publicacion ha sido reportada por varios usuarios y puede ser falsa'
    }
    return mensaje;
}

async function criteriosCrearPublicacion(titulo, descripcion, direccion){
   let error=false;
   let mensajes=[];
   let mensaje;
   if(!/\w/.test(titulo)){
        error=true;
        mensaje="El titulo Debe contener al menos un caracter alfanumerico";
        mensajes.push(mensaje);
   }
   if(!/\w/.test(descripcion)){
        error=true;
        mensaje="La descripcion Debe contener al menos un caracter alfanumerico";
        mensajes.push(mensaje);
   }
    if(!/\w/.test(direccion)){
        error=true;
        mensaje="La direccion Debe contener al menos un caracter alfanumerico";
        mensajes.push(mensaje);
    }
    if(descripcion.length>200){
        error=true;
        mensaje="La descripcion no puede tener mas de 200 caracteres";
        mensajes.push(mensaje);
    }

    return {mensajes,error};
    
    
}

function mostarModificarPublicacion(titulo, usuarioPublicacion, usuarioActual){
    if(usuarioCreador(usuarioPublicacion, usuarioActual)){
        return true;
    }
}
    




module.exports = {ordenarAlfabeticamente,
    mostrarMensaje,
    buscarPorPalabraClave,
    obtenerDatosPorTitulo,
    pruebaDatosPorTítulo,
    pruebaBusquedaPorPalabraClave,
    mostrarMensajeDeReporte,
    criteriosCrearPublicacion,
    mostarModificarPublicacion,
}