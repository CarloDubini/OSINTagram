const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');

//Mostrar publicacion -> request(pregunta por la publicacion con ese id)
test('Comprobar no hay errores en la peticion del usuario con un Id Correcto', async () => {
    let pasaTest = true;
    try {
      id = 'IwWoulHSw7v7sxAHdOn5';
      const peticion = await db.collection('Publicaciones').doc(id).get()
      const publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
  }, 20000);
test('Comprobar se recibe bien el usuarion en la peticion con un Id Correcto', async () => {
    let pasaTest = true; let datos = {}; let publicacion = {}; 
    datos.usuario = "anonimo";
    try {
      id = 'IwWoulHSw7v7sxAHdOn5';
      const peticion = await db.collection('Publicaciones').doc(id).get()
      publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
      pasaTest = false;
    }
    pasaTest = pasaTest && (datos.usuario == publicacion.datos.usuario);
    expect(pasaTest).toBe(true);
  }, 20000);
  
