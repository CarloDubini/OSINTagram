const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {ordenarAlfabeticamente}  = require('OSINTagram/src/Controller/publicacionController.js');
const {tituloVacio,longitudLista,titulosVacios} = require('OSINTagram/src/Controller/tests.js')

let lista = [];
beforeAll(async () => {
    lista = [
        {
            titulo: "Juan Embid se calla durante 5 minutos",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/photo_5832450131113394442_y.jpg?alt=media&token=d2173186-4187-41b8-9bc7-941a6dee88e6",
            descripcion: "un dia duro en la oficina",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 3.3,
            reportes: 10
        },
        {
            titulo: "OSINTagram en quiebra",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/Empresa-quebrada.jpg?alt=media&token=33a921b5-100b-4539-9924-7d4d4d09b66d",
            descripcion: "Osintagram se ha quebrado tras la perdida de nuestro querido Gabriel",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes: 2
        },
        {
            titulo: "Masacre en Lugansk",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/670942972_224140671_1024x576.jpg?alt=media&token=050b34ef-200e-4fc3-ab5a-0ec062902978",
            descripcion: "Muerte y mas muerte en Lugansk",
            localizacion: "Frunze St, 106, Luhans'k, Luhans'ka oblast, Ucrania, 91000",
            valoracion: 1.3,
            reportes: 2
        }
      ];
}, 15000);

test('Comprobar titulos no vacios', async () => {
  expect(titulosVacios(lista)).toBe(true);
}, 20000);

test('Comprobar que se reciben n titulos de publicacion', async () => {
  expect(longitudLista(lista)).toBe(lista.length);
}, 20000);

test('Comprobar que se recibe una lista vacia', async () => {
  let listaVacia =[]
  expect(longitudLista(listaVacia)).toBe(0);
}, 20000);

test('Comprobar que se ordenan alfabeticamente por el título', async () => {
    lista2=lista
    lista2.sort((a, b) => a.titulo.localeCompare(b.titulo))
    expect(await ordenarAlfabeticamente(lista)).toBe(lista2);
}, 20000);
