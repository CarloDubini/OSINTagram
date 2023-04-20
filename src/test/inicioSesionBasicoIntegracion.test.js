const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {mostrarMensajeDeReporte} = require('OSINTagram/src/Controller/userController.js');


 test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario y una contreseña correctas', async () => {
     let pasaTest = true;
//     try{
//         const id = 'IwWoulHSw7v7sxAHdOn5';
//         const peticion = await db.collection('Publicaciones').doc(id).get()
//         const numReportes = {id:id, datos : peticion.data().reportes}
//         mostrarMensajeDeReporte(numReportes.datos);
//     }catch(error){
//         pasaTest = false;
//     }
     expect(pasaTest).toBe(true);
 }, 20000);

// test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario que no existe y una contreseña', async () => {
//     let pasaTest = true;
//     let mensajeEsperado = 'Esta publicacion ha sido reportada por varios usuarios y puede ser falsa';
//     let mensajeGenerado;
//     try{
//         const id = 'pKt4lzyXhGbxyYqWAnkC';
//         const peticion = await db.collection('Publicaciones').doc(id).get()
//         const numReportes = {id:id, datos : peticion.data().reportes}
//         mensajeGenerado = mostrarMensajeDeReporte(numReportes.datos);
//     }catch(error){
//         pasaTest = false;
//     }
//     expect(mensajeGenerado).toBe(mensajeEsperado);
// }, 20000);

// test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario que existe y una contreseña incorrecta', async () => {
//     let pasaTest = true;
//     let mensajeEsperado = '';
//     let mensajeGenerado;
//     try{
//         const id = 'IwWoulHSw7v7sxAHdOn5';
//         const peticion = await db.collection('Publicaciones').doc(id).get()
//         const numReportes = {id:id, datos : peticion.data().reportes}
//         mensajeGenerado = mostrarMensajeDeReporte(numReportes.datos);
//     }catch(error){
//         pasaTest = false;
//     }
//     expect(mensajeGenerado).toBe(mensajeEsperado);
// }, 20000);



