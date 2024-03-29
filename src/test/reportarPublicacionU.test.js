const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {mostrarMensajeDeReporte} = require('OSINTagram/src/Controller/publicacionController.js');
const {obtenerNumeroReportesPorID,aumentarNumeroReportesPorID } = require('../Controller/tests');

let lista = [];
beforeAll(async () => {
    lista = [
        {
            id: "12324",
            titulo: "Juan Embid se calla durante 5 minutos",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/photo_5832450131113394442_y.jpg?alt=media&token=d2173186-4187-41b8-9bc7-941a6dee88e6",
            descripcion: "un dia duro en la oficina",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 3.3,
            reportes: 9
        },
        {
            id: "CKqS9fC51z7IsVKj7dB6",
            titulo: "OSINTagram en quiebra",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/Empresa-quebrada.jpg?alt=media&token=33a921b5-100b-4539-9924-7d4d4d09b66d",
            descripcion: "Osintagram se ha quebrado tras la perdida de nuestro querido Gabriel",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes: 2
        },
        {
            id: "IwWoulHSw7v7sxAHdOn5",
            titulo: "Tanque en la Universidad Complutense",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/militares-del-ejercito-danes-en-tanques-leopard.jpeg?alt=media&token=46780d8c-c976-4a18-857b-c88884bc119c",
            descripcion: "Hay un tanque parado en frente de la puerta principal de la Facultad de Informática de la Universidad Complutense. Hay militares cerca, pero no se sabe el motivo por el cual este ha sido movilizado.",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes:9
        }
      ];
}, 15000);

test('Comprobar que se aumenta el numero de reportes correctamente', async () => {
    let pasaTest = true;
    try{
        const id = "12324";
        let reportesAnteriores = obtenerNumeroReportesPorID(id,lista);
        let nuevoNumeroReportes = aumentarNumeroReportesPorID(id,lista);
        if(nuevoNumeroReportes != reportesAnteriores+1){
            pasaTest = false;
        }
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que al aumentar el numero de reportes a 10 se muestra el mensaje de aviso', async () => {
    let pasaTest = true;
    try{
        const id = 'IwWoulHSw7v7sxAHdOn5';
        let numReportes = obtenerNumeroReportesPorID(id,lista);
        if(mostrarMensajeDeReporte(numReportes)!=""){
            pasaTest = false;
        }
        let mensajeEsperado = 'Esta publicacion ha sido reportada por varios usuarios y puede ser falsa';
        let nuevoNumeroReportes = aumentarNumeroReportesPorID(id,lista);
        if(mostrarMensajeDeReporte(nuevoNumeroReportes)!=mensajeEsperado){
            pasaTest = false;
        }
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que la funcion de mostrar mensaje de reporte no devuelve nada si al reportar la publicacion tiene menos de 10 reportes', async () => {
    let pasaTest = true;
    try{
        const id = 'CKqS9fC51z7IsVKj7dB6';
        let numReportes = obtenerNumeroReportesPorID(id,lista);
        if(mostrarMensajeDeReporte(numReportes)!=""){
            pasaTest = false;
        }
        let mensajeEsperado = "";
        let nuevoNumeroReportes = aumentarNumeroReportesPorID(id,lista);
        if(mostrarMensajeDeReporte(nuevoNumeroReportes)!=mensajeEsperado){
            pasaTest = false;
        }
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);
