"use strict";

const express = require("express");
const morgan = require('morgan')
const path = require('path')
const exhbs = require('express-handlebars')




// Crear un servidor Express.js
const app = express();
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(require('./routers/index'));
app.use(express.static(path.join(__dirname,'public')))

module.exports =app;