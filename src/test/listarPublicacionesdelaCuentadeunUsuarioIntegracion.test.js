const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {ordenarAlfabeticamente}  = require('OSINTagram/src/Controller/publicacionController.js');
const {obtenerPublicacionesPorNombre, tituloVacio,longitudLista,titulosVacios} = require('OSINTagram/src/Controller/tests.js')

let lista;
let lista2;
beforeAll(async () => {
  const querySnapshot = await db.collection('Publicaciones').get();
  lista2 = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  lista = obtenerPublicacionesPorNombre(lista2, 'paco')
}, 15000);

test('Comprobar titulos no vacios', async () => {
  expect(titulosVacios(lista)).toBe(true);
}, 20000);

test('Comprobar que se reciben n titulos de publicacion', async () => {
  expect(longitudLista(lista)).toBe(lista.length);
}, 20000);

test('Comprobar que se ordenan alfabeticamente por el título', async () => {
    lista2=lista
    lista2.sort((a, b) => a.titulo.localeCompare(b.titulo))
    expect(await ordenarAlfabeticamente(lista)).toBe(lista2);
}, 20000);
