const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');


  
let lista;
function tituloVacio(title){
    if(title === ""){
        return true;
    }
    return false;
}
function titulosVacios(lista){
    for(let i=0; i<lista.length;i++){
        if(tituloVacio(lista[i])) return false;
    }
    return true;
}
function longitudLista(lista){
    console.log(lista.length)
    return lista.length;
}
function ordenarAlfabeticamente(lista){
    lista.sort((a, b) => a.titulo.localeCompare(b.titulo))
    return lista;
}
beforeAll(async () => {
  const querySnapshot = await db.collection('Publicaciones').get();
  lista = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}, 15000);

test('Comprobar titulos no vacios', async () => {
  expect(titulosVacios(lista)).toBe(true);
}, 20000);

test('Comprobar que se reciben n titulos de publicacion', async () => {
  expect(longitudLista(lista)).toBe(8);
}, 20000);

test('Comprobar que se recibe una lista vacia', async () => {
  const querySnapshot = await db.collection('Publicaciones').get();
  const listaVacia = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  expect(longitudLista(listaVacia)).toBe(0);
}, 20000);

test('Comprobar que se ordenan alfabeticamente por el título', async () => {
    lista2=lista
    lista2.sort((a, b) => a.titulo.localeCompare(b.titulo))
    expect(ordenarAlfabeticamente(lista)).toBe(lista2);
}, 20000);