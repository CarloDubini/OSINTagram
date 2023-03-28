const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {buscarPorPalabraClave,ordenarAlfabeticamente} = require('OSINTagram/src/routers/index.js')


jest.setTimeout(13000);
let lista = [];
let prueba = [];
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

  
  test('Comprobar que la funcion buscar por palabra clave funciona correctamente', async () =>{
    let pasaTest = true;
    try{
        await buscarPorPalabraClave('Juan', lista)
    }catch{
      pasaTest = false;
    }
    expect(pasaTest).toBe(true)
  }, 10000)

  test('Comprobar que el título de la publicación contenga la palabra clave',async () =>{
    prueba= await buscarPorPalabraClave('Lugansk',lista)
    expect( prueba[0].titulo).toBe('Masacre en Lugansk')
  },20000)

  test('Comprobar que la descripción de la publicación contenga la palabra clave',async () =>{
    prueba= await buscarPorPalabraClave('Gabriel',lista)
    expect( prueba[0].titulo).toBe('OSINTagram en quiebra')
  },20000)

  test('Comprobar que si no insertas ningún título, te devuelve todas las publicaciones', async() =>{
    prueba= await buscarPorPalabraClave('',lista)
    expect(prueba).toStrictEqual(lista)
  },10000)

  test('Comprobar que si insertas una palabra que no está en ningun titulo ni descripcion, no te devuelve ninguna publicacion', async() =>{
    prueba= await buscarPorPalabraClave('qqqqqqqqqqqaaaaaaaaaaaaazzzzzzzzzzzzz',lista)
    expect(prueba.lenght).toBe(undefined);
  },10000)



 
  


