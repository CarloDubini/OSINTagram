const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {buscarPorPalabraClave,ordenarAlfabeticamente} = require('OSINTagram/src/routers/index.js')


jest.setTimeout(13000);

beforeAll(async () => {
    const querySnapshot = await db.collection('Publicaciones').get();
    lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
}, 15000);
  

  test('Comprobar que el título de la publicación contenga la palabra clave',async () =>{
    let prueba= await buscarPorPalabraClave('Lugansk',lista)
    expect( prueba[0].titulo).toBe('Masacre en Lugansk')
  },20000)

  test('Comprobar que si no insertas ningún título, te devuelve todas las publicaciones', async() =>{
    let prueba= await buscarPorPalabraClave('',lista)
    expect(prueba).toStrictEqual(lista)
  },10000)

 
  


