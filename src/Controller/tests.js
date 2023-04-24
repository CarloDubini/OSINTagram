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
    for(let i=0; i<lista.length;i++){
        if(lista[i].id === id) return lista[i];
    }
    return "";
};

function obtenerUsuarioPorNombredeUsuario(nombreUsuario,lista){ 
    for(let i=0; i<lista.length;i++){
        if(lista[i].nombreUsuario === nombreUsuario) return lista[i];
    }
    return "";
};

function obtenerValoracionPorID(id,lista){ 
    for(let i=0; i<lista.length;i++){
        if(lista[i].id === id) return lista[i].valoracion;
    }
    return "";
};
function obtenerNumeroReportesPorID(id,lista){ 
    for(let i=0; i<lista.length;i++){
        if(lista[i].id === id) return lista[i].reportes;
    }
    return "";
};
function aumentarNumeroReportesPorID(id,lista){
    for(let i=0; i<lista.length;i++){
        if(lista[i].id === id) {
            lista[i].reportes = lista[i].reportes + 1;
            return lista[i].reportes;
        } 
    }
    return "";
}
function usuarioDuplicado(nombreUsuario, lista){
    for(let i=0; i<lista.length;i++){
        if(lista[i].nombreUsuario === nombreUsuario) {
            return true;
        } 
    }
    return false;
}

function obtenerPublicacionesPorNombre(lista, nombre){
    let res = [];
    for(let i=0; i<lista.length;i++){
        if(lista[i].usuario === nombre) 
            res.push(lista[i])
    }
    return res;
}

module.exports= {obtenerPublicacionesPorNombre, tituloVacio,longitudLista,titulosVacios,obtenerPublicacionPorID,obtenerValoracionPorID,obtenerNumeroReportesPorID,aumentarNumeroReportesPorID,usuarioDuplicado};