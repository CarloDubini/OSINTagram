const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
//const {obtenerPublicacionPorID}  = require('OSINTagram/src/Controller/tests.js');



describe("Creación de publicaciones", () => {
  test("Crear nueva publicación", async () => {
    // Simular datos de una nueva publicación
    const nuevaPublicacion = {
        titulo: "Nuevo título",
        localizacion: "Nueva localización",
        descripcion: "Nueva descripción",
        imagen: "Nueva imagen",
        reportes: 0
      };
    /*const nuevaPublicacion = {
      titulo: "AAAAAA",
      localizacion: "Marte, sistema Solar, nº4, (123,123)",
      descripcion: "Marte...",
      imagen: "https://noticias.la105.com.ar/wp-content/uploads/2021/04/volo-a-un-maximo-de___AMKD6eaCL_1200x630__1-2400x1524_c.jpg",
      reportes: 3
    };
*/
    // Realizar petición POST a la ruta "/crear" con los datos de la nueva publicación
    await db.collection("Publicaciones").add(nuevaPublicacion);

    // Obtener la última publicación añadida a la base de datos
    const querySnapshot = await db.collection('Publicaciones').get();
    const publicacion = querySnapshot.docs[0].data();

    // Comprobar si los datos de la publicación creada coinciden con los datos enviados en la petición POST
    expect(publicacion.titulo).toEqual(nuevaPublicacion.titulo);
    expect(publicacion.localizacion).toEqual(nuevaPublicacion.localizacion);
    expect(publicacion.descripcion).toEqual(nuevaPublicacion.descripcion);
    expect(publicacion.imagen).toEqual(nuevaPublicacion.imagen);
    expect(publicacion.reportes).toEqual(nuevaPublicacion.reportes);

    //await db.collection("Publicaciones").delete(nuevaPublicacion);
  });
});
