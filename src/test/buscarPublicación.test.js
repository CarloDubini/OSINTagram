const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {tituloVacio,longitudLista,titulosVacios} = require('OSINTagram/src/Controller/tests.js')

jest.setTimeout(13000);

beforeAll(async () => {
    const querySnapshot = await db.collection('Publicaciones').get();
    lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }, 15000);


  test('Comprobar que el título de la publicación contenga la palabra clave',async () =>{
    
  },20000)
  


