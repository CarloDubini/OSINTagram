const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {mostrarMensajeDeReporte} = require('OSINTagram/src/Controller/publicacionController.js');

test('Comprobar que se aumenta el numero de reportes correctamente', async () => {
    let pasaTest = true;
    try{
        const id = "8UTfhncy75xlRQNpmC9n";

        let peticion = await db.collection("Publicaciones").doc(id).get();
        let publicacion = { id: id, datos: peticion.data() };

        // Obtener el valor actual del atributo "reportes"
        const reportesAnteriores = publicacion.datos.reportes;

        // Actualizar el valor del atributo "reportes"
        await db
            .collection("Publicaciones")
            .doc(id)
            .update({ reportes: reportesAnteriores + 1 });

        peticion = await db.collection("Publicaciones").doc(id).get();
        publicacion = { id: id, datos: peticion.data() };
        const nuevoNumeroReportes = publicacion.datos.reportes;
        if(nuevoNumeroReportes != reportesAnteriores+1){
            pasaTest = false;
        }
    }catch(error){
        pasaTest = false;
        console.log(error);
    }
    expect(pasaTest).toBe(true);
}, 20000);

afterAll(async () => {
    const id = "8UTfhncy75xlRQNpmC9n";
    const peticion = await db.collection("Publicaciones").doc(id).get();
    const publicacion = { id: id, datos: peticion.data() };

    // Obtener el valor actual del atributo "reportes"
    const reportesNuevos = publicacion.datos.reportes;
    // Actualizar el valor del atributo "reportes"
    await db
        .collection("Publicaciones")
        .doc(id)
        .update({ reportes: reportesNuevos - 1 });
});

