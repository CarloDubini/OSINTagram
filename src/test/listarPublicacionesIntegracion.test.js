const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {ordenarAlfabeticamente}  = require('OSINTagram/src/routers/index.js');
const {tituloVacio,longitudLista,titulosVacios} = require('OSINTagram/src/Controller/tests.js')

let lista;
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
  console.log(lista);
  expect(longitudLista(lista)).toBe(lista.length);
}, 20000);

test('Comprobar que se recibe una lista vacia', async () => {
  const querySnapshot = await db.collection('Publicaciones').get();
  let listaVacia =[]
  expect(longitudLista(listaVacia)).toBe(0);
}, 20000);

test('Comprobar que se ordenan alfabeticamente por el título', async () => {
    lista2=lista
    lista2.sort((a, b) => a.titulo.localeCompare(b.titulo))
    expect(await ordenarAlfabeticamente(lista)).toBe(lista2);
}, 20000);
