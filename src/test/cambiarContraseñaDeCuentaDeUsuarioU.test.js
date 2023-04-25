const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerPublicacionesPorNombre, obtenerUsuarioPorNombredeUsuario} =  require('OSINTagram/src/Controller/tests.js');


let lista = [];
beforeAll(async () => {
    lista = [{
        nombreUsuario: "osintagram",
        contraseña: "123456",
        logueado: "0",
        }
    ];
}, 15000);

//Test cambio de contraseña exitosa
test('Comprobar que la funcion cambia la contraseña correctamente', async () => {
    let pasaTest = false;
    try{
        const nombreUsuario = 'manuel45';
        const nuevaContraseña = 'manuelpepe';
        usuario = obtenerPublicacionesPorNombre(nombreUsuario, lista);
        usuario.contraseña = nuevaContraseña;
        if(nuevaContraseña === usuario.contraseña) pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(true);
}, 20000);

//test cambio de contaseña se repite mal
test('Comprobar que la funcion cambia la contraseña mal', async () => {
    let pasaTest = false;
    try{
        const nombreUsuario = 'manuel45';
        const nuevaContraseña = 'manuelpepe';
        usuario = obtenerPublicacionesPorNombre(nombreUsuario, lista);
        if(nuevaContraseña !== usuario.contraseña) pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(true);
}, 25000);

//test cambio de contraseña vacia
test('Comprobar que la funcion cambia la contraseña vacia', async () => {
    let pasaTest = false;
    try{
        const nombreUsuario = 'manuel45';
        const nuevaContraseña = '';
        usuario = obtenerPublicacionesPorNombre(nombreUsuario, lista);
        if(nuevaContraseña === '') pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(true);
}, 25000);
