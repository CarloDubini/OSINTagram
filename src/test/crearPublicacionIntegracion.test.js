const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
//const {obtenerPublicacionPorID}  = require('OSINTagram/src/Controller/tests.js');



describe("Creación de publicaciones", () => {
  test("Crear nueva publicación", async () => {
    // Simular datos de una nueva publicación
    const nuevaPublicacion = {
      titulo: "AAAAAA",
      localizacion: "Marte, sistema Solar, nº4, (123,123)",
      descripcion: "Marte...",
      imagen: "https://noticias.la105.com.ar/wp-content/uploads/2021/04/volo-a-un-maximo-de___AMKD6eaCL_1200x630__1-2400x1524_c.jpg",
      reportes: 3
    };
    // Realizar petición POST a la ruta "/crear" con los datos de la nueva publicación
    await db.collection("Publicaciones").doc("pr2").set(nuevaPublicacion);
    // Obtener la última publicación añadida a la base de datos
    const peticion = await db.collection("Publicaciones").doc("pr2").get();
    const publicacion = { id: "pr2", datos: peticion.data() };
    // Comprobar si los datos de la publicación creada coinciden con los datos enviados en la petición POST
    expect(publicacion.datos.titulo).toEqual(nuevaPublicacion.titulo);
    expect(publicacion.datos.localizacion).toEqual(nuevaPublicacion.localizacion);
    expect(publicacion.datos.descripcion).toEqual(nuevaPublicacion.descripcion);
    expect(publicacion.datos.imagen).toEqual(nuevaPublicacion.imagen);
    expect(publicacion.datos.reportes).toEqual(nuevaPublicacion.reportes);

    await db.collection('Publicaciones').doc("pr2").delete();
  });
});
