const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {buscarPorPalabraClave,ordenarAlfabeticamente} = require('OSINTagram/src/Controller/publicacionController.js');


jest.setTimeout(13000);

beforeAll(async () => {
    const querySnapshot = await db.collection('Publicaciones').get();
    lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    jest.spyOn(console, 'log').mockImplementation(() => {});
}, 15000);
  
  test('Comprobar que la funcion buscar por palabra clave funciona correctamente', async () =>{
    let pasaTest = true;
    try{
      buscarPorPalabraClave('Juan', lista)
    }catch{
      pasaTest = false;
    }
    expect(pasaTest).toBe(true)
  }, 10000)

  test('Comprobar que el título de la publicación contenga la palabra clave',async () =>{
    let prueba= await buscarPorPalabraClave('Lugansk',lista)
    expect( prueba[0].titulo).toBe('Masacre en Lugansk')
  },20000)

  test('Comprobar que la descripción de la publicación contenga la palabra clave',async () =>{
    let prueba= await buscarPorPalabraClave('Gabriel',lista)
    expect( prueba[0].titulo).toBe('OSINTagram en quiebra')
  },20000)

  test('Comprobar que si no insertas ningún título, te devuelve todas las publicaciones', async() =>{
    let prueba= await buscarPorPalabraClave('',lista)
    expect(prueba).toStrictEqual(lista)
  },10000)

  test('Comprobar que si insertas una palabra que no está en ningun titulo ni descripcion, no te devuelve ninguna publicacion', async() =>{
    let prueba= await buscarPorPalabraClave('qqqqqqqqqqqaaaaaaaaaaaaazzzzzzzzzzzzz',lista)
    expect(prueba.lenght).toBe(undefined);
  },10000)

  afterAll(() => {
    console.log.mockRestore();
  });

 
  


