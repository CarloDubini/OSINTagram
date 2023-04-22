"use strict";
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");

// Crear un servidor Express.js
const app = express();
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Rutas
const { PublicacionRouter } = require("./routers/publicacionRouter.js");
app.use("/", PublicacionRouter);
const { UserRouter } = require("./routers/usuarioRouter.js");
app.use("/user", UserRouter);

// app.use(
//   session({
//     secret: "clave_secreta",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use((req, res, next) => {
  // Si la cookie "sesion" no existe
  console.log("OLA TIO");
  if (!req.cookies.sesion) {
    res.cookie("sesion", "false");
  }
  next();
});

app.use((req, res, next) => {
  // Si la cookie "sesion" existe y tiene un valor de "true"
  if (req.cookies.sesion === "true") {
    console.log("La sesión está iniciada");
  } else {
    console.log("La sesión no está iniciada");
  }
  next();
});

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.error("No se pudo inicializar el servidor: " + err.message);
  } else {
    console.log(`Servidor arrancado en el puerto ${port}`);
  }
});
