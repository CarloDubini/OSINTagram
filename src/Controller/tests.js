"use strict"


function tituloVacio(title){
    if(title === ""){
        return true;
    }
    return false;
}

function titulosVacios(lista){
    for(let i=0; i<lista.length;i++){
        if(tituloVacio(lista[i].titulo)) return false;
    }
    return true;
}

function longitudLista(lista){
    return lista.length;
}

function obtenerPublicacionPorID(id,lista){ 
    console.log("Hola");
    for(let i=0; i<lista.length;i++){
        if(lista[i].id === id) return lista[i];
    }
    console.log("Fin");
    return "";
};
module.exports= {tituloVacio,longitudLista,titulosVacios,obtenerPublicacionPorID};