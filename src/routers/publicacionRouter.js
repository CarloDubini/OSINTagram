const { Router } = require("express");
const { db, firebaseAdmin } = require("../firebase");
const multer = require("multer");
const {
  ordenarAlfabeticamente,
  mostrarMensaje,
  buscarPorPalabraClave,
  obtenerDatosPorTitulo,
  pruebaDatosPorTítulo,
  pruebaBusquedaPorPalabraClave,
  mostrarMensajeDeReporte,
} = require("../Controller/publicacionController.js");


// esto es para que se pueda subir imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });


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

PublicacionRouter.post("/crear", upload.single("imagen"), async (req, res) => {
  const { titulo, descripcion, direccion } = req.body;
  const imagenFile = req.file;

  // Subir la imagen a Firebase Storage. Firebase = require("firebase-auth")
  const bucket = firebaseAdmin.storage().bucket();
   await bucket.upload(imagenFile.path, {
    metadata: {
      metadata: {
        contentType: imagenFile.mimetype,
      },
    },
  });
  const imagenUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${imagenFile.filename}?alt=media`;
  // Guardar la publicación en Firestore
  const publicacionRef = await db.collection("Publicaciones").add({
    titulo: titulo,
    descripcion: descripcion,
    localizacion: direccion,
    imagen: imagenUrl,
    reportes:0,
    valoracion:-1
  });
  //quiero obtener la id de la nueva publicación
  const id = publicacionRef.id;
  res.redirect(`/publicacion/${id}`);
});


//-----------FUNCIONES VARIAS--------------
//están en publicacionController.js así que no hace falta ponerlas aquí

module.exports = { PublicacionRouter };
