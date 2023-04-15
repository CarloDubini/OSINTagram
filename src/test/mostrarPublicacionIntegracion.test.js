const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {ordenarAlfabeticamente}  = require('OSINTagram/src/Controller/publicacionController.js');

//Mostrar publicacion -> request(pregunta por la publicacion con ese id)
test('Comprobar no hay errores en la peticion de la informacion con un Id Correcto', async () => {
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
test('Comprobar se recibe bien la informacion en la peticion con un Id Correcto', async () => {
    let pasaTest = true; let datos = {}; let publicacion = {}; 
    datos.titulo ='Tanque en la Universidad Complutense';
    datos.imagen ='https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/militares-del-ejercito-danes-en-tanques-leopard.jpeg?alt=media&token=46780d8c-c976-4a18-857b-c88884bc119c';
    datos.descripcion =' Hay un tanque parado en frente de la puerta principal de la Facultad de Informática de la Universidad Complutense. Hay militares cerca, pero no se sabe el motivo por el cual este ha sido movilizado.';
    datos.localizacion = 'Calle del Prof. José García Santesmases, 9, 28040 Madrid';
    datos.valoracion =4.3;
    try {
      id = 'IwWoulHSw7v7sxAHdOn5';
      const peticion = await db.collection('Publicaciones').doc(id).get()
      publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
      pasaTest = false;
    }
    pasaTest = pasaTest && (datos.titulo == publicacion.datos.titulo) && (datos.descripcion == publicacion.datos.descripcion)&& (datos.localizacion == publicacion.datos.localizacion)&& (datos.imagen == publicacion.datos.imagen);
    expect(pasaTest).toBe(true);
  }, 20000);
test('Comprobar que no hay errores en la peticion de la informacion con un Id que no existe', async () => {
    let pasaTest = true;
    try {
      id = 'IwWoulHSw7v7sxAHdOn1';
      const peticion = await db.collection('Publicaciones').doc(id).get()
      const publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
  }, 20000);
test('Comprobar que se recibe un objeto undefined en la peticion de la informacion con un Id que no existe', async () => {
    let pasaTest = true;
    try {
      id = 'IwWoulHSw7v7sxAHdOn1';
      const peticion = await db.collection('Publicaciones').doc(id).get()
      const publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
      pasaTest = false;
    }
    expect(typeof publicacion).toBe("undefined");
  }, 20000);
  
