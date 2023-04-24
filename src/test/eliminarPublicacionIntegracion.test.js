const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerPublicacionPorID}  = require('OSINTagram/src/Controller/tests.js');

test('Comprobar que se elimina correctamente', async () => {
    let pasaTest = true;
    try {
        const nuevaPublicacion = {
        titulo: "AAAAAA",
        localizacion: "Marte, sistema Solar, nº4, (123,123)",
        descripcion: "Marte...",
        imagen: "https://noticias.la105.com.ar/wp-content/uploads/2021/04/volo-a-un-maximo-de___AMKD6eaCL_1200x630__1-2400x1524_c.jpg",
        reportes: 3
        };
        await db.collection("Publicaciones").doc("pr2").set(nuevaPublicacion);
        await db.collection("Publicaciones").doc("pr2").delete();
        const peticion = await db.collection("Publicaciones").doc("pr2").get();
        const publicacion = {id:id, datos : peticion.data()}
    } catch (error) {
      pasaTest = false;
    }
    expect(typeof publicacion).toBe("undefined");
}, 20000);