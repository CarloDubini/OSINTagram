const { Router } = require("express");
const { db } = require("../firebase");
const {
  ordenarAlfabeticamente,
  mostrarMensaje,
  buscarPorPalabraClave,
  obtenerDatosPorTitulo,
  pruebaDatosPorTítulo,
  pruebaBusquedaPorPalabraClave,
  mostrarMensajeDeReporte,
} = require("../Controller/publicacionController.js");

const PublicacionRouter = Router();

//-------------------GETTS y POSTS---------------
PublicacionRouter.get("/", async (req, res) => {
  const querySnapshot = await db.collection("Publicaciones").get();
  const lista = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  ordenarAlfabeticamente(lista);
  // coger la foto para la valoracion
  const fotovalQuerySnapshot = await db.collection("fotoval").get();
  const fotoval = fotovalQuerySnapshot.docs.map((doc) => doc.data().link);

  res.render("main", { taskList: lista, fotoval: fotoval });
});

PublicacionRouter.get("/publicacion:id", async (req, res) => {
  //en vez de lista yo quiero datos[id]
  const querySnapshot = await db.collection("Publicaciones").get();
  const lista = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  ordenarAlfabeticamente(lista);

  res.render("main", { publicacion: lista });
});
//----------------VER CADA PUBLICACION-------------
PublicacionRouter.get("/publicacion/:id", async (req, res) => {
  let id = req.params.id;
  const peticion = await db.collection("Publicaciones").doc(id).get();
  const publicacion = { id: id, datos: peticion.data() };
  console.log(
    "--------------------HE CLICKADO EN LA PUBLICACION:---------------------"
  );
  console.log(publicacion);
  let mensaje = mostrarMensajeDeReporte(publicacion.datos.reportes);
  console.log("reportes:", publicacion.datos.reportes, "msg:", mensaje);
  res.render("publicacion", { publicacion, mensaje });
});

//----------------REPORTAR-------------
PublicacionRouter.get("/publicacion/:id/reportar", async (req, res) => {
  let id = req.params.id;
  const peticion = await db.collection("Publicaciones").doc(id).get();
  const publicacion = { id: id, datos: peticion.data() };

  // Obtener el valor actual del atributo "reportes"
  const reportesAnteriores = publicacion.datos.reportes;

  // Actualizar el valor del atributo "reportes"
  await db
    .collection("Publicaciones")
    .doc(id)
    .update({ reportes: reportesAnteriores + 1 });

  res.redirect(`/publicacion/${id}`);
});
//----------------BUSCAR POR PALABRA CLAVE-------------
PublicacionRouter.get("/search", async (req, res) => {
  const palabraBuscada = req.query.searchInput;
  const querySnapshot = await db.collection("Publicaciones").get();
  const lista = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const fotovalQuerySnapshot = await db.collection("fotoval").get();
  const fotoval = fotovalQuerySnapshot.docs.map((doc) => doc.data().link);
  const resultado = await buscarPorPalabraClave(palabraBuscada, lista);

  res.render("main", { taskList: resultado, fotoval: fotoval });
});

//-----------------CREAR PUBLICACION-----------------
PublicacionRouter.get("/crear", (req, res) => {
  res.render("crearPublicacion");
});

PublicacionRouter.post("/crear", async (req, res) => {
  const { titulo, localizacion, descripcion, imagen } = req.body;
  const nuevaPublicacion = {
    titulo,
    localizacion,
    descripcion,
    imagen,
    reportes: 0,
  };
  await db.collection("Publicaciones").add(nuevaPublicacion);
  res.redirect("/publicacion");
});

//-----------------LOGIN USUARIO-----------------
PublicacionRouter.get("/login", async (req, res) => {
  res.render("iniciarSesion");
});

//-----------FUNCIONES VARIAS--------------
//están en publicacionController.js así que no hace falta ponerlas aquí

module.exports = { PublicacionRouter };
