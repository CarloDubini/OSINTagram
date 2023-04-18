const { Router } = require("express");
const { db } = require("../firebase");
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

//-----------------REGISTRAR USUARIO-----------------
UserRouter.post("/registrar", async (req, res) => {
  const { nombreUsuario, contraseña, contraseñaIgual } = req.body;
  const nuevoUsuario = {
    nombreUsuario,
    contraseña,
  };
  let mensaje = await mostrarMensajeDeContraseñasNoIguales(
    nuevoUsuario.contraseña,
    contraseñaIgual
  );
  if (mensaje == "") {
    mensaje = await mostrarMensajeDeUsuarioYaExiste(nuevoUsuario.nombreUsuario);
  }
  if (mensaje == "") {
    await db.collection("Usuarios").add(nuevoUsuario);
    mensaje = "Nuevo usuario creado correctamente";
  }
  console.log(mensaje);
  res.render("registrarUsuario", { mensaje });
});

// -----------------LOGIN USUARIO-----------------
UserRouter.get("/login", async (req, res) => {
  res.render("iniciarSesion");
});

module.exports = { UserRouter };
