const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerPublicacionesPorNombre, obtenerUsuarioPorNombredeUsuario} =  require('OSINTagram/src/Controller/tests.js');

//Test cambio de contraseña exitosa
test('Comprobar que la funcion cambia la contraseña correctamente', async () => {
        let pasaTest = false;
        try{
            const id = '5Udm3VdHS9Pd8ECd9kUu';
            const contraseña = '1234';
            const nuevaContraseña = '4321';    
            await usuarioDoc.ref.update({ contraseña: nuevaContraseña });
            const peticion = await db.collection('Usuarios').doc(id).get()
            const usuario = {id:id, datos : peticion.data()}
            convertMultiFactorInfoToServerFormat.log(usuario.contraseña)
            if(nuevaContraseña === usuario.contraseña) pasaTest = true;
        }catch(error){
            pasaTest = false;
        }
            expect(pasaTest).toBe(false);
        
}, 20000);

//test cambio de contaseña se repite mal
test('Comprobar que la funcion cambia la contraseña correctamente', async () => {
    let pasaTest = false;
    try{
        const id = '5Udm3VdHS9Pd8ECd9kUu';
        const contraseña = '1234';
        const nuevaContraseña = '4321'; 
        const contraseñaRepeticion = '1234';  
        await usuarioDoc.ref.update({ contraseña: nuevaContraseña });
        const peticion = await db.collection('Usuarios').doc(id).get()
        const usuario = {id:id, datos : peticion.data()}
        convertMultiFactorInfoToServerFormat.log(usuario.contraseña)
        if(nuevaContraseña !== contraseñaRepeticion) pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
        expect(pasaTest).toBe(false);
    
}, 20000);

//test cambio de contraseña a la misma contarseña
test('Comprobar que la funcion cambia la contraseña correctamente', async () => {
    let pasaTest = false;
    try{
        const id = '5Udm3VdHS9Pd8ECd9kUu';
        const contraseña = '1234';
        const nuevaContraseña = '1234';    
        await usuarioDoc.ref.update({ contraseña: nuevaContraseña });
        const peticion = await db.collection('Usuarios').doc(id).get()
        const usuario = {id:id, datos : peticion.data()}
        convertMultiFactorInfoToServerFormat.log(usuario.contraseña)
        if(contraseña === usuario.contraseña) pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
        expect(pasaTest).toBe(false);
    
}, 20000);

//test cambio de contraseña vacia
test('Comprobar que la funcion cambia la contraseña correctamente', async () => {
    let pasaTest = false;
    try{
        const id = '5Udm3VdHS9Pd8ECd9kUu';
        const contraseña = '1234';
        const nuevaContraseña = "";   
        await usuarioDoc.ref.update({ contraseña: nuevaContraseña });
        const peticion = await db.collection('Usuarios').doc(id).get()
        const usuario = {id:id, datos : peticion.data()}
        convertMultiFactorInfoToServerFormat.log(usuario.contraseña)
        if("" === usuario.contraseña) pasaTest = true;
    }catch(error){
        pasaTest = false;
    }
        expect(pasaTest).toBe(false);
    
}, 20000);
