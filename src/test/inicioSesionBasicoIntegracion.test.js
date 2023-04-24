const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerUsuarioPorNombredeUsuario} =  require('OSINTagram/src/Controller/tests.js');

test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario y una contreseña correctas', async () => {
    let pasaTest = true;
    try{
        const id = '5Udm3VdHS9Pd8ECd9kUu';
        const contraseña = '1234';
        const nombreUsuario = "pepep";
        const peticion = await db.collection('Usuarios').doc(id).get()
        const usuario = {id:id, datos : peticion.data()}
        if(nombreUsuario !== usuario.datos.nombreUsuario && contraseña !== usuario.datos.contraseña) pasaTest = false;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(true);
}, 20000);

 test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario que no existe y una contreseña', async () => {
    let pasaTest = true;
    try{
        const nombreUsuario = 'pepeppp';
        const peticion = await db.collection('Usuarios').doc(nombreUsuario).get()
        usuario = {id:id, datos : peticion.data()}
    }catch(error){
        pasaTest = false;
    }
     expect(typeof usuario).toBe("undefined");
 }, 20000);

 test('Comprobar que la funcion de iniciar sesión funciona correctamente cuando se introducen un usuario que existe y una contreseña incorrecta', async () => {
    let pasaTest = true;
    try{
        const nombreUsuario = 'pepep';
        const contraseña = '1234444';
        const peticion = await db.collection('Usuarios').doc(nombreUsuario).get()
        const contraseñaU = {id:id, datos : peticion.data().contraseña}
        if(contraseña !== contraseñaU) pasaTest = false;
    }catch(error){
        pasaTest = false;
    }
     expect(pasaTest).toBe(false);
 }, 20000);