"use strict";
require('dotenv').config();

const express = require("express");
const morgan = require('morgan')
const path = require('path')




// Crear un servidor Express.js
const app = express();
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const {PublicacionRouter} = require('./routers/publicacionRouter.js');
app.use("/",PublicacionRouter);
const {UserRouter} = require('./routers/usuarioRouter.js');
app.use("/user",UserRouter);
app.use(express.static(path.join(__dirname,'public')))

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.error("No se pudo inicializar el servidor: " + err.message);
  } else {
    console.log(`Servidor arrancado en el puerto ${port}`);
  }
});
