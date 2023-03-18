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
    console.log(lista.length)
    return lista.length;
}

module.exports= {tituloVacio,longitudLista,titulosVacios};