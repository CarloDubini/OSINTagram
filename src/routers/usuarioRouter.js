const { Router } = require("express");
const { db } = require("../firebase");
const { auth } = require("../firebase");
const { signInWithEmailAndPassword } = require("../firebase");
const { createUserWithEmailAndPassword } = require("../firebase");
const {
  mostrarMensajeDeContraseñasNoIguales,
  mostrarMensajeDeUsuarioYaExiste,
  mostrarMensaje,
} = require("../Controller/userController.js");

const UserRouter = Router();

UserRouter.get("/user/:id", async (req, res) => {
  let id = req.params.id;
  const peticion = await db.collection("Usuarios").doc(id).get();
  const usuario = { id: id, datos: peticion.data() };
  console.log(
    "--------------------HE CLICKADO EN EL USUARIO:---------------------"
  );
  console.log(usuario);
  res.render("user", { usuario });
});
UserRouter.get("/", async (req, res) => {
  res.redirect("/login");
});
//-----------------REGISTRAR USUARIO-----------------
UserRouter.get("/registrar", async (req, res) => {
  const mensaje = "Nuevo ";
  res.render("registrarUsuario", { mensaje });
});

UserRouter.post("/registrar", async (req, res) => {
  const { nombreUsuario, contraseña, contraseñaIgual } = req.body;

  // Verificar que la contraseña y la confirmación sean iguales
  let mensaje = await mostrarMensajeDeContraseñasNoIguales(
    contraseña,
    contraseñaIgual
  );

  // Verificar que no exista un usuario con el mismo nombre de usuario
  const usuarioExistente = await db
    .collection("Usuarios")
    .where("nombreUsuario", "==", nombreUsuario)
    .get();

  if (!usuarioExistente.empty) {
    mensaje = "Ya existe un usuario con este nombre de usuario";
  }

  // Si no hay errores, crear el nuevo usuario
  if (!mensaje) {
    const nuevoUsuario = {
      nombreUsuario,
      contraseña,
      logeado: 0,
    };

    try {
      await db.collection("Usuarios").add(nuevoUsuario);
      mensaje = "Nuevo usuario creado correctamente";
    } catch (error) {
      console.error("Error al crear nuevo usuario:", error);
      mensaje = "Error al crear nuevo usuario";
    }
  }

  console.log(mensaje);
  res.render("registrarUsuario", { mensaje });
});
// -----------------LOGIN USUARIO-----------------
UserRouter.get("/login", async (req, res) => {
  let mensaje = "";
  res.render("iniciarSesion", { mensaje });
});
UserRouter.post("/login", async (req, res) => {
  console.log("OLAAA");
  const { nombreUsuario, contraseña } = req.body;
  // Validar que se hayan recibido los datos necesarios
  let mensaje = "";
  if (!nombreUsuario || !contraseña) {
    mensaje = "Faltan datos requeridos";
  }

  try {
    // Buscar el usuario por nombre de usuario y contraseña
    const userDocs = await db
      .collection("Usuarios")
      .where("nombreUsuario", "==", nombreUsuario)
      .where("contraseña", "==", contraseña)
      .get();

    if (userDocs.empty) {
      // Si no se encontró el usuario, retornar un error
      mensaje = "Nombre de usuario o contraseña incorrectos";
      res.render("iniciarSesion", { mensaje });
    } else {
      // Actualizar el valor de "logeado" a 1 para el usuario que ha iniciado sesión
      const userId = userDocs.docs[0].id;
      await db.collection("Usuarios").doc(userId).update({ logeado: 1 });
      console.log("entro");

      // Establecer la cookie de sesión
      res.cookie("sesion", "true");
      res.cookie("nombreUser", nombreUsuario);

      res.redirect("/");
    }
  } catch (error) {}
});
// UserRouter.get("/nologin", async (req, res) => {
//   let mensaje = "";
//   res.cookie("sesion", "false");

//   res.redirect("/");
// });
// -----------------CIERRE SESION-----------------
UserRouter.get("/logout", async (req, res) => {
  let mensaje = "";
  res.cookie("nombreUser", "anonimo");
  res.cookie("sesion", "false");
  res.render("cerrarSesion", { mensaje });
});
UserRouter.post("/logout", async (req, res) => {
  const { nombreUsuario, contraseña } = req.body;
  // Validar que se hayan recibido los datos necesarios
  if (!nombreUsuario || !contraseña) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    // Buscar el usuario por nombre de usuario y contraseña
    const userDocs = await db
      .collection("Usuarios")
      .where("nombreUsuario", "==", nombreUsuario)
      .where("contraseña", "==", contraseña)
      .get();

    if (userDocs.empty) {
      // Si no se encontró el usuario, retornar un error
      return res
        .status(401)
        .json({ error: "Nombre de usuario o contraseña incorrectos" });
    } else {
      // Actualizar el valor de "logeado" a 0
      const userId = userDocs.docs[0].id;
      await db.collection("Usuarios").doc(userId).update({ logeado: 0 });
      res.cookie("sesion", "false");
      res.redirect("/");
    }
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return res.status(500).json({ error: "Error al buscar usuario" });
  }
});
module.exports = { UserRouter };
