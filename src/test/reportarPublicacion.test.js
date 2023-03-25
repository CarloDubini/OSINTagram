const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {mostrarMensajeDeReporte} = require('OSINTagram/src/routers/index.js')

test('Comprobar que la funcion de mostrar mensaje de reporte funciona correctamente con un valor dado', async () => {
    let pasaTest = true;
    try{
        let numReportes = 15;
        mostrarMensajeDeReporte(numReportes);
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que la funcion de mostrar mensaje de reporte funciona correctamente con valores extraidos de la base de datos', async () => {
    let pasaTest = true;
    try{
        const id = 'IwWoulHSw7v7sxAHdOn5';
        const peticion = await db.collection('Publicaciones').doc(id).get()
        const numReportes = {id:id, datos : peticion.data().reportes}
        mostrarMensajeDeReporte(numReportes.datos);
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que la funcion de mostrar mensaje de reporte devuelve el mensaje de publicacion falsa si esta tiene 10 o mas reportes', async () => {
    let mensajeEsperado = 'Esta publicacion ha sido reportada por varios usuarios y puede ser falsa';
    let numReportes = 15;
    let mensajeGenerado = mostrarMensajeDeReporte(numReportes);
    expect(mensajeGenerado).toBe(mensajeEsperado);
}, 20000);

test('Comprobar que la funcion de mostrar mensaje de reporte no devuelve nada si esta tiene menos de 10 reportes', async () => {
    let mensajeEsperado = "";
    let numReportes = 3;
    let mensajeGenerado = mostrarMensajeDeReporte(numReportes);
    expect(mensajeGenerado).toBe(mensajeEsperado);
}, 20000);




