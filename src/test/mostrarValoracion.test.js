const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');

beforeAll(async () => {
    const querySnapshot = await db.collection('Publicaciones').get();
    lista = querySnapshot.docs.map(doc => ({
      id: doc.id,
      valoracion: doc.data().valoracion
    }));
  }, 15000);

test('Comprobar que se recibe bien la valoración en la petición con un Id Correcto', async () => {
    let pasaTest = true;
    const valoracionEsperada = 4.3;
    try {
      const id = 'IwWoulHSw7v7sxAHdOn5';
      const peticion = await db.collection('Publicaciones').doc(id).get();
      const publicacion = { id: id, datos: peticion.data() };
      pasaTest = publicacion.datos.valoracion === valoracionEsperada;
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que se recibe bien la valoración en la petición con un Id Correcto', async () => {
    let pasaTest = true;
    const valMin = 1;
    const valMax = 5;
    try {
      const id = 'IwWoulHSw7v7sxAHdOn5';
      const peticion = await db.collection('Publicaciones').doc(id).get();
      const publicacion = { id: id, datos: peticion.data() };
      if(publicacion.datos.valoracion < valMin || publicacion.datos.valoracion > valMax){
        pasaTest = false;
        }
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

// Comprobar que se recibe bien la valoración en la petición con un Id Correcto
test('Comprobar se recibe bien la valoración en la petición con un Id Correcto', async () => {
    let pasaTest = true; let datos = {}; let publicacion = {};
    datos.valoracion = 4.3;
    try {
    id = 'IwWoulHSw7v7sxAHdOn5';
    const peticion = await db.collection('Publicaciones').doc(id).get()
    publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
    pasaTest = false;
    }
    pasaTest = pasaTest && (datos.valoracion == publicacion.datos.valoracion);
    expect(pasaTest).toBe(true);
    }, 20000);

test('Comprobar que la petición de información con un Id que no existe devuelve undefined en la valoración', async () => {
        const id = 'IwWoulHSw7v7sxAHdOn1';
        const peticion = await db.collection('Publicaciones').doc(id).get();
        const publicacion = {id:id, datos : peticion.data()};
        expect(publicacion.datos.valoracion).toBeUndefined();
    }, 20000);
    
