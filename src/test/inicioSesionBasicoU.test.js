const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerUsuarioPorNombredeUsuario} =  require('OSINTagram/src/Controller/tests.js');

let lista = [];
beforeAll(async () => {
    lista = [
        {
            nombreUsuario: "osintagram",
            contraseña: "123456",
            logueado: "0",
        },
        {
            nombreUsuario: "pepe22",
            contraseña: "pepemanuel",
            logueado: "0",
        },
        {
            nombreUsuario: "manuel45",
            contraseña: "manuelpepe",
            logueado: "0",
        }
      ];
}, 15000);

test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario y una contreseña correctas', async () => {
    let pasaTest = true;
    try{
        const nombreUsuario = 'manuel45';
        const contraseña = 'manuelpepe';
        usuario = obtenerUsuarioPorNombredeUsuario(nombreUsuario, lista);
        if(contraseña === usuario.contraseña) pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(false);
}, 20000);

 test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario que no existe y una contreseña', async () => {
    let pasaTest = true;
    try{
        const nombreUsuario = 'manuel44444';
        usuario = obtenerUsuarioPorNombredeUsuario(nombreUsuario,lista);
    }catch(error){
        pasaTest = false;
    }
     //expect(usuario).toBe("");
 }, 20000);

 test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario que existe y una contreseña incorrecta', async () => {
    let pasaTest = true;
    try{
        const nombreUsuario = 'manuel45';
        const contraseña = 'manuelpepeeeee';
        usuario = obtenerUsuarioPorNombredeUsuario(nombreUsuario,lista);
        if(contraseña !== usuario.contraseña) pasaTest = false;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(false);
 }, 20000);