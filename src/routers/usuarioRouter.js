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

//-----------------REGISTRAR USUARIO-----------------
UserRouter.get("/registrar", async (req, res) => {
  const mensaje = "Nuevo ";
  res.render("registrarUsuario", { mensaje });
});
// const { nombreUsuario, contraseña, contraseñaIgual } = req.body;
// const nuevoUsuario = {
//   nombreUsuario,
//   contraseña,
// };
// let mensaje = await mostrarMensajeDeContraseñasNoIguales(
//   nuevoUsuario.contraseña,
//   contraseñaIgual
// );
// if (mensaje == "") {
//   mensaje = await mostrarMensajeDeUsuarioYaExiste(nuevoUsuario.nombreUsuario);
// }
// if (mensaje == "") {
//   await db.collection("Usuarios").add(nuevoUsuario);
//   mensaje = "Nuevo usuario creado correctamente";
// }
// console.log(mensaje);
// res.render("registrarUsuario", { mensaje });
UserRouter.post("/registrar", async (req, res) => {
  const email = req.body.nombreUsuario;
  const password = req.body.contraseña;

  const auth = getAuth(); // Obtener la instancia de autenticación de Firebase Admin SDK

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Usuario creado correctamente:", userCredential.user.toJSON());
    res.render("registrarUsuario", {
      mensaje: "Nuevo usuario creado correctamente",
    });
  } catch (error) {
    console.log("Error al crear el usuario:", error);
    let mensaje = "";
    if (error.code === "auth/email-already-exists") {
      mensaje = "El nombre de usuario elegido ya existe";
    } else {
      mensaje =
        "Ha ocurrido un error al crear el usuario. Por favor, inténtalo de nuevo más tarde.";
    }
    res.render("registrarUsuario", { mensaje });
  }
});
// -----------------LOGIN USUARIO-----------------
UserRouter.get("/login", async (req, res) => {
  res.render("iniciarSesion");
});
UserRouter.post("/login", async (req, res) => {
  const email = req.body.nombreUsuario;
  const password = req.body.contraseña;

  const firebaseAuth = auth; // Obtener la instancia de autenticación de Firebase Admin SDK

  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Inicio de sesión correcto");
      res.render("main", { user: userCredential.user.toJSON() });
    })
    .catch((error) => {
      console.log("Error al iniciar sesión:", error);
      let mensaje = "";
      if (error.code === "auth/user-not-found") {
        mensaje = "El usuario no existe";
      } else if (error.code === "auth/wrong-password") {
        mensaje = "Contraseña incorrecta";
      } else {
        mensaje =
          "Ha ocurrido un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.";
      }
      res.render("iniciarSesion", { mensaje });
    });
});

module.exports = { UserRouter };
